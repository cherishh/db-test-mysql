import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Blog",
  description: "test blog",
};

export default async function Blog({ params }: { params: { id: string } }) {
  const res = await fetch('http://worldtimeapi.org/api/timezone/america/chicago', {
    next: {
      revalidate: 5,
    }
  });
  const data = await res.json();
  console.log(data, 'data');
  return (
    <div>
      <h1>id: {params.id}</h1>
      <p>{data.datetime}</p>
      <Link href='/about'>about</Link>
    </div>
  );
}
