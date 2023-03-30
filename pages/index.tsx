import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="">
      <div className="py-5 px-10 active:text-[#008e9c] text-bold flex flex-row justify-end gap-5 active:underline underline-offset-4">
        <Link
          href="/"
          className="active text-[#008e9c] hover:text-[#00d2e6] underline underline-offset-4 font-bold"
        >
          HOME
        </Link>
        <Link href="/ideas" className="hover:text-[#00d2e6]">
          IDEAS
        </Link>
        <Link href="/for-investors" className="hover:text-[#00d2e6]">
          FOR INVESTORS
        </Link>
        <Link href="/faq" className="hover:text-[#00d2e6]">
          FAQ
        </Link>
        <Link href="/contact" className="hover:text-[#00d2e6]">
          CONTACT US
        </Link>
      </div>
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
              <button className="bg-[#028390] px-5 py-3 text-sm">
                POST YOUR IDEA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm mt-10 text-center text-gray-500">
        Copyright © 2023 Ideamarked - All Rights Reserved.
      </div>
    </div>
  );
};

export default Home;
