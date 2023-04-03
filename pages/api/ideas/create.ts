import type { NextApiRequest, NextApiResponse } from "next";
import { simpleApiHandler } from "../../../lib/api";
import { postIdea } from "../../../lib/db";
import { nanoid } from "nanoid";

export type Idea = {
  name: string;
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Idea>
) {
  return simpleApiHandler(req, res, async (user) => {
    console.log(user);
    const formData = req.body;
    formData.id = nanoid();
    formData.id_user = user.id;
    const row = await postIdea(formData);
    return { ...row };
  });
}
