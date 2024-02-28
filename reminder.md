# 切换 db
1. 修改.env & .env.local
2. 修改 schema.prisma
3. pnpx prisma generate
4. (pnpx prisma migrate dev --name init)
5. PROD: fly set secrets xxx
