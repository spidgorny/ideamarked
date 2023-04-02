/* eslint-disable react/display-name */
import { Layout } from "../../components/layout";
import Link from "next/link";

export default function () {
  return (
    <Layout>
      <img
        src="https://img1.wsimg.com/isteam/stock/1580/:/cr=t:5.07%25,l:0%25,w:89.86%25,h:89.86%25/rs=w:100%25"
        style={{ height: "300px", objectFit: "cover", width: "100%" }}
      />

      <div className="text-center">
        <Link href="/ideas/create" className="bg-[#028390] px-5 py-3 text-sm">
          POST YOUR IDEA
        </Link>
      </div>
    </Layout>
  );
}
