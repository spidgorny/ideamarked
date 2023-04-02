import dotenv from "dotenv";

export async function runTest(code: () => Promise<any>) {
  dotenv.config({ path: "../.env" });
  await code();
}
