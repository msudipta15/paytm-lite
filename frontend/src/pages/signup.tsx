export function Signup() {
  return (
    <div className="w-full h-screen bg-slate-950 flex-col items-center justify-center">
      <div className="bg-slate-950    w-full flex h-full justify-center ">
        <div className="bg-white px-8 py-4 pb-8 mt-32   flex flex-col rounded-md h-fit w-1/5">
          <div className=" flex justify-center items-center mb-3 font-bold  text-3xl">
            Sign up
          </div>
          <div className="text-slate-900 font-medium ml-1">username</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700  "
          />
          <div className="text-slate-900 font-medium ml-1">password</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <div className="text-slate-900 font-medium ml-1">firstname</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <div className="text-slate-900 font-medium ml-1">lastname</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700"
          />
          <button className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-3.5 cursor-pointer hover:bg-slate-800 ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
