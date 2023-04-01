import { getIdeas, getUserByEmail } from "../lib/contentful";
import { runTest } from "./bootstrap";
import { hashPassword } from "../pages/api/auth/[...nextauth]";

runTest(async () => {
  const data = await getIdeas();
  console.log(data.items);

  const user = await getUserByEmail("slawa@gmail.com");
  console.log(user);

  const hash = await hashPassword("someshit");
  console.log({ hash });
});
