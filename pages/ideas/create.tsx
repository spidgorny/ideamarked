import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../../components/layout";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return (
      <Layout>
        <div className="text-center py-16">
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </Layout>
    );
  }
  return <Layout>test</Layout>;
}
