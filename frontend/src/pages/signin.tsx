export function Signin() {
  return (
    <div className="w-full h-screen bg-slate-950 flex-col items-center justify-center">
      <div className="bg-slate-950    w-full flex h-full justify-center ">
        <div className="bg-white px-8 py-8 mt-48    flex flex-col rounded-md h-fit w-1/5">
          <div className=" flex justify-center items-center mb-3 font-bold  text-3xl">
            Sign in
          </div>
          <div className="text-slate-900 font-medium ml-1">username</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700 "
          />
          <div className="text-slate-900 font-medium ml-1">password</div>
          <input
            type="text"
            className="p-1 m-1  border rounded-md border-slate-700"
          />

          <button className="p-2 bg-slate-950 rounded-md text-white text-lg font-medium mt-5">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
