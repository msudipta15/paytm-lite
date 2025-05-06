import { useNavigate } from "react-router-dom";
import { Brandcard } from "../components/brandcard";
import { FeatureCard1 } from "../components/featurecard1";
import { FeatureCard2 } from "../components/featurecard2";
import { FeatureCard3 } from "../components/featurecard3";
import { HomeFooter } from "../components/homefooter";
import { HomeTopBar } from "../components/hometopbar";
import { ReviewCrad1 } from "../components/reviewcard1";
import { ReviewCrad2 } from "../components/reviewcard2";
import { SubscribeCard } from "../components/subscribeCard";
import { Mfeature1 } from "../icons/mfeature1";
import { Mfeature3 } from "../icons/mfeature3";
import { Mfeature2 } from "../icons/mfeautre2";
import { Mfeature4 } from "../icons/mfeauture4";

export function Home2() {
  const navigate = useNavigate();

  function handlesignup() {
    navigate("/signup2");
  }

  function handlesignin() {
    navigate("/signin2");
  }

  return (
    <div className="w-full min-h-screen max-h-full bg-gray-100">
      <HomeTopBar handlesignin={handlesignin} handlesignup={handlesignup} />
      <Brandcard handlesignin={handlesignin} handlesignup={handlesignup} />
      <div className="bg-gray-50 pb-12">
        <div className="text-center p-3 pt-12  mb-2 text-slate-900 text-3xl font-bold">
          Why Choose Paytm ?
        </div>
        <div className="flex justify-center gap-32 ">
          <FeatureCard1 />
          <FeatureCard2 />
          <FeatureCard3 />
        </div>
      </div>
      <div className="pb-12">
        <div className="text-center p-3 pt-12  mb-2 text-slate-900 text-3xl font-bold">
          Why our Users say ?
        </div>
        <div className="flex justify-center gap-20">
          <ReviewCrad1 />
          <ReviewCrad2 />
        </div>
      </div>
      <div className="bg-gray-50 pb-12">
        <div className="text-center p-3 pt-12  mb-2 text-slate-900 text-3xl font-bold">
          More Features
        </div>
        <div className="flex justify-center gap-32 ">
          <Mfeature1 />
          <Mfeature2 />
          <Mfeature3 />
          <Mfeature4 />
        </div>
      </div>
      <SubscribeCard />
      <HomeFooter />
    </div>
  );
}
