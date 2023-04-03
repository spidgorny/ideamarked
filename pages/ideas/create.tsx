import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../../components/layout";
import { useFormFields } from "react-helpers/use-form-fields";
import axios from "axios";
import { SaveButton } from "react-helpers/save-button";
import { useRouter } from "next/router";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useFormFields([
    {
      label: "Name",
      name: "name",
      labelClass: "block",
      inputClass: "border p-1 rounded w-full focus",
    },
    {
      label: "Description",
      name: "description",
      value: "",
      type: "textarea",
      labelClass: "block",
      inputClass: "border p-1 rounded w-full h-32",
    },
  ]);

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-16">
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </Layout>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/ideas/create", form.formData);
      if (data.id) {
        await router.push("/ideas/" + data.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const disabled =
    form.isWorking || !form.formData.name || !form.formData.description;

  return (
    <Layout>
      <div className="container mx-auto p-3 max-w-6xl border">
        <h3 className="text-2xl mb-3">Post your idea:</h3>
        <form onSubmit={onSubmit}>
          {form.render()}
          <SaveButton
            className="bg-zink-500 border rounded px-3 py-1"
            disabled={disabled}
          >
            Submit Idea
          </SaveButton>
        </form>
      </div>
    </Layout>
  );
}
