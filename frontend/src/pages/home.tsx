import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function handlesignup() {
    navigate("/signup");
  }

  function handlesignin() {
    navigate("/signin");
  }
  return (
    <div className=" h-screen w-full bg-white">
      <div className="bg-white text-blue-500 h-96 flex justify-center items-baseline-last p-6 text-5xl font-extrabold">
        Paytm
      </div>
      <div className="bg-white flex justify-center  h-1/3">
        <div>
          <button
            className="bg-slate-950 text-white rounded-md cursor-pointer py-4 px-10 m-4"
            onClick={() => {
              handlesignup();
            }}
          >
            Signup
          </button>
        </div>
        <div>
          <button
            className="bg-slate-950 text-white rounded-md cursor-pointer  py-4 px-10 m-4"
            onClick={() => {
              handlesignin();
            }}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}
