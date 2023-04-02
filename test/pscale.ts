import { getIdeas, getUserByEmail } from "../lib/db";
import { runTest } from "./bootstrap";

runTest(async () => {
  const data = await getIdeas();
  console.log(data);

  const user = await getUserByEmail("slawa@gmail.com");
  console.log(user);
});
