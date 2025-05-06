export function HomeTopBar() {
  return (
    <div className="bg-white  p-4 py-4 flex justify-between items-center">
      <div className=" font-bold text-4xl pl-20 text-blue-600">Paytm</div>
      <div className="flex gap-4 items-center font-medium mr-20 ">
        <button className="bg-white text-blue-600 px-4 py-2 text-lg font-medium rounded-md cursor-pointer hover:text-blue-800">
          Sign in
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 text-lg font-medium rounded-md cursor-pointer hover:bg-blue-800">
          Sign up
        </button>
      </div>
    </div>
  );
}
