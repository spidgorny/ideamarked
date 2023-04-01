import Link from "next/link";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="layout">
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
      {children}
      <div className="text-sm mt-10 text-center text-gray-500">
        Copyright © 2023 Ideamarked - All Rights Reserved.
      </div>
    </div>
  );
}
