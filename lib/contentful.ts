import * as contentful from "contentful";

// console.log(contentful);

const client = contentful.createClient({
  space: "sbme4ak878fw",
  environment: "master",
  accessToken: "4olLrlDpimPDIQT2q7tFbmRvpjY2iON5qBT6VfWDIu0",
});

export function getIdeas() {
  return client.getEntries({
    content_type: "idea",
  });
}

export function getUsers() {
  return client.getEntries({
    content_type: "user",
  });
}

export interface User {
  email: string;
  name: string;
  password: string;
  created_at: Date;
}

export async function getUserByEmail(email: string) {
  return (
    await client.getEntries<User>({
      content_type: "user",
      "fields.email": email,
    })
  ).items[0];
}
