import { MysqlConnector } from "./mysql/mysql-connector";

let db;
export function getDb() {
  if (db) {
    return db;
  }
  db = new MysqlConnector(process.env.DATABASE_URL);
  return db;
}

export async function getUserByEmail(email: string) {
  const tUser = getDb().getTable("user");
  return tUser.selectOne({ email });
}

export async function getIdeas() {
  const tIdea = getDb().getTable("idea");
  return tIdea.select({});
}

export async function postIdea(formData) {
  const tIdea = getDb().getTable("idea");
  const { insertId } = await tIdea.insert(formData);
  return tIdea.selectOne({ id: insertId });
}
