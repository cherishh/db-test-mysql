import Image from 'next/image';
import prisma from '../lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const data = await prisma.product.findMany({});
  console.log(data, 'data');

  const handleAdd = async (data: FormData) => {
    'use server';
    const name = String(data.get('name'));
    const { error } = await prisma.product.create({
      data: {
        name: name,
        description: 'test',
        image: '/images/helmet.jpg',
        price: 100,
        category_id: 1,
      },
    });
    if (error) {
      console.log(error, 'error');
    }
    revalidatePath('/');
  }

  return (
    <main className='flex min-h-screen w-full p-4'>
      <div className='bg-green-300'>
        <h1>Products</h1>
        <ul>
          {data.map((product) => (
            <li key={product.id} className='mb-2'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4'>
        <form action={handleAdd}>
          <input type="text" name='name'/>
        </form>
      </div>
    </main>
  );
}
