import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex items-center justify-center bg-white dark:bg-black sm:items-start">
        <div className="flex">
          <ul>
            <li>
              <a href="/article" className="bg-indigo-500 px-8 py-4 rounded-2xl hover:bg-indigo-300 transition-all duration-300 hover:text-black hover:px-16">Article</a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
