/* eslint-disable react/display-name */
import { Layout } from "../../components/layout";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "react-helpers/lib/fetcher";
import Image from "next/image";

export function useIdeaList() {
  const apiUrl = "/api/ideas";
  const { isLoading, data } = useSWR(apiUrl, fetcher);
  return { isLoading, apiUrl, ideas: data?.ideas ?? [] };
}

export default function () {
  const { ideas } = useIdeaList();

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl">
        <img
          src="https://img1.wsimg.com/isteam/stock/1580/:/cr=t:5.07%25,l:0%25,w:89.86%25,h:89.86%25/rs=w:100%25"
          style={{ height: "300px", objectFit: "cover", width: "100%" }}
        />

        <div className="text-center -mt-16 mb-16">
          <Link href="/ideas/create" className="bg-[#028390] px-5 py-3 text-sm">
            POST YOUR IDEA
          </Link>
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {ideas.map((x) => (
            <Idea key={x.id} idea={x} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export function Idea({ idea }) {
  return (
    <div className="w-[32%] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={"/ideas/" + idea.id}>
        <Image
          className="rounded-t-lg cover"
          width={400}
          height={300}
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt="cover picture"
        />
      </Link>
      <div className="p-5">
        <Link href={"/ideas/" + idea.id}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {idea.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {idea.description}
        </p>
        <Link
          href={"/ideas/" + idea.id}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
