import type { NextPage } from "next";
import { Layout } from "../components/layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mt-5">
        <div className="relative">
          <video
            src="https://websites.godaddy.com/categories/v4/videos/raw/video/uGbA6v1EwwF20VGXJ"
            className="w-full"
            loop
            autoPlay
            muted
          ></video>
          <div className="w-full text-white absolute inset-0 pt-48">
            <h1 className="text-4xl font-bold text-center px-16 text-shadow">
              GLOBAL IDEA MARKET FOR PEOPLE AND INVESTORS
            </h1>
            <h2 className="text-center text-xl text-shadow my-5">
              Make yourself free and post your business idea or ideas.
            </h2>
            <div className="text-center">
              <Link
                href="/ideas/create"
                className="bg-[#028390] px-5 py-3 text-sm"
              >
                POST YOUR IDEA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
