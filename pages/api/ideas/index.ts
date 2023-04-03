import type { NextApiRequest, NextApiResponse } from "next";
import { simpleApiHandler } from "../../../lib/api";
import { getIdeas, postIdea } from "../../../lib/db";
import { nanoid } from "nanoid";
import { Idea } from "./create";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ideas: Idea[] }>
) {
  return simpleApiHandler(req, res, async (user) => {
    const ideas = await getIdeas();
    return { ideas };
  });
}
