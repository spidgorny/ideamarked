import invariant from "tiny-invariant";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import chalk from "chalk";

export async function requiresAuth(req, res) {
  const session = await getServerSession(req, res, authOptions);
  // console.log('requiresAuth', {session})

  const user = session.user;
  if (!user) {
    throw new Error("access denied");
  }
  return user;
}

export async function simpleApiHandler(req, res, someCode) {
  const start = new Date();
  try {
    let user = await requiresAuth(req, res);
    let json = await someCode(user);
    res.json({
      ...json,
      runtime: (new Date().getTime() - start.getTime()) / 1000,
    });
  } catch (e) {
    handleApiError(req, res, e);
  }
}

export async function methodHandler(req, res, methodMap) {
  const start = new Date();
  try {
    await requiresAuth(req, res);
    let method = req.method;
    if (req?.body?.__method) {
      method = req.body.__method;
    }
    if (req?.query?.__method) {
      method = req.query.__method;
    }
    let actionFunction = await methodMap[method];
    invariant(actionFunction, `No handler for [${method}]`);
    const json = await actionFunction(req, res);

    // don't overwrite if the output was already injected
    if (json) {
      const output = {
        method: method,
        ...json,
        runtime: (new Date().getTime() - start.getTime()) / 1000,
      };
      // console.log("[general-api-endpoint.mjs]: ", { output })
      return res.json(output);
    }
  } catch (e) {
    handleApiError(req, res, e);
  }
}

export function handleApiError(req, res, error) {
  if (error?.response?.data) {
    console.error(
      chalk.red("AXIOS ERROR", error.response.status),
      error.response.data
    );
  } else {
    console.error(chalk.red("API ERROR"), error);
  }
  // console.log("process.env.NEXTJS_ENV", process.env.NEXTJS_ENV);

  let errorClass = error?.constructor?.name ?? "error";

  if (res.getHeader("WWW-Authenticate")) {
    res.status(401).json("Please authenticate yourself.");
  } else {
    let errorMessage = error.response?.data?.message ?? error.message;
    let errorStack = error?.stack?.split("\n");
    if (process.env.NEXTJS_ENV === "development") {
      res.status(500).json({
        status: errorClass,
        message: errorMessage,
        stack: errorStack,
      });
    } else {
      res.status(500).json({
        status: errorClass,
        message: errorMessage,
        stack: errorStack,
      });
    }
  }
}
