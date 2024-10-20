"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { MdClear } from "react-icons/md";

export default function Hero() {
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const handleSearchChange = () => {
    const searchValue = searchRef.current?.value;
    params.set("search", searchValue || "");
    router.push(pathname + '?' + params.toString());
  };

  const handleClearSearch = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
    params.delete("search");
    router.replace(pathname);
  }


  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">Find your next <br /> dream job</h1>
      <p className="text-center text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda qui omnis impedit, tempora nam a consequatur et. Ducimus aliquid sequi quod, nihil suscipit numquam et tempore ipsa culpa, doloribus autem?</p>
      <div className="flex gap-4 mt-4 max-w-md mx-auto">
        <div className='relative w-full'>
          {searchParams.size > 0 && (
            <button onClick={() => handleClearSearch()} type='button' className='absolute right-3 top-1/2 -translate-y-1/2' title='Clear'>
              <MdClear size={20} />
            </button>
          )}
          <input ref={searchRef} type="search" name="search" placeholder="Search phrase..."
            className="w-full py-2 px-3 rounded-md border border-gray-400"
          />
        </div>
        <button type='button' onClick={() => handleSearchChange()} className="bg-blue-600 text-white py-2 px-4 rounded-md">Search</button>
      </div>
    </section >
  )
}
