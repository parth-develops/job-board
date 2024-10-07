
export default function Hero() {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">Find your next <br /> dream job</h1>
      {/* <p className="text-center text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda qui omnis impedit, tempora nam a consequatur et. Ducimus aliquid sequi quod, nihil suscipit numquam et tempore ipsa culpa, doloribus autem?</p> */}
      <form action="" className="flex gap-4 mt-4 max-w-md mx-auto">
        <input type="search" name="" id="" placeholder="Search phrase..."
          className="w-full py-2 px-3 rounded-md border border-gray-400"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">Search</button>
      </form>
    </section>
  )
}
