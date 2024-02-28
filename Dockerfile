# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && apt-get install -y ca-certificates

# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

ADD package.json pnpm-lock.yaml ./
RUN pnpm install --production=false

# Setup production node_modules
FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json pnpm-lock.yaml ./
RUN pnpm prune --production

# Build the app
FROM base as build

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

# If we're using Prisma, uncomment to cache the prisma schema
ADD prisma .
RUN npx prisma generate

ADD . .
RUN pnpm build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

# Uncomment if using Prisma
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
ADD . .

CMD ["pnpm", "run", "start"]