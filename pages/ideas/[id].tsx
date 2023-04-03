/* eslint-disable react/display-name */
import { Layout } from "../../components/layout";
import { getIdeaById } from "../../lib/db";
import { fixPropsForJson } from "react-helpers/lib/object";

export async function getServerSideProps({ params, req, res }) {
  const id = params.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  let idea = await getIdeaById(id);
  idea = fixPropsForJson(idea);
  return {
    props: { idea },
  };
}

export default function ({ idea }) {
  return (
    <Layout>
      <div className="container mx-auto">
        <img
          src="https://img1.wsimg.com/isteam/stock/1580/:/cr=t:5.07%25,l:0%25,w:89.86%25,h:89.86%25/rs=w:100%25"
          style={{ height: "300px", objectFit: "cover", width: "100%" }}
          className="mb-3"
        />

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {idea.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {idea.description}
        </p>
      </div>
    </Layout>
  );
}
