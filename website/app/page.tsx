import Hero from '../components/Hero';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        {/* Add your blog posts section here */}
      </div>
    </main>
  );
}
