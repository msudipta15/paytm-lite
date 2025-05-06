export function Brandcard() {
  return (
    <div className="bg-blue-600 h-80 w-full">
      <div className="text-white text-center">
        <h1 className="text-6xl pt-10 font-extrabold">Welcome to Paytm</h1>
        <h3 className="mt-3  text-2xl">
          Send and receive money effortlessly with Paytm. Secure, fast, and easy
        </h3>
        <h3 className="  text-2xl">payments at your fingertips.</h3>
      </div>
      <div className="pt-12 flex justify-center gap-5">
        <button className="px-7 py-3 text-lg font-medium rounded-lg text-blue-500 cursor-pointer hover:text-blue-700 bg-white">
          Get Started
        </button>
        <button className="px-5 py-2.5 border text-white  font-medium text-lg border-white cursor-pointer hover:text-blue-200 rounded-md">
          Sign in
        </button>
      </div>
    </div>
  );
}
