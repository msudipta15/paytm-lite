import { Brandcard } from "../components/brandcard";
import { FeatureCard1 } from "../components/featurecard1";
import { FeatureCard2 } from "../components/featurecard2";
import { FeatureCard3 } from "../components/featurecard3";
import { HomeTopBar } from "../components/hometopbar";

export function Home2() {
  return (
    <div className="w-full min-h-screen max-h-full bg-gray-100">
      <HomeTopBar />
      <Brandcard />
      <div className="text-center p-3 pt-6  mb-2 text-slate-900 text-3xl font-bold">
        Why Choose Paytm ?
      </div>
      <div className="flex justify-center gap-32">
        <FeatureCard1 />
        <FeatureCard2 />
        <FeatureCard3 />
      </div>
    </div>
  );
}
