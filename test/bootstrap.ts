export async function runTest(code: () => Promise<any>) {
  await code();
}
