import {
  getDeleteQuery,
  getInsertQuery,
  getInsertUpdateQuery,
  getSelectQuery,
  getUpdateQuery,
} from "./query-builder";
import invariant from "tiny-invariant";
import { MysqlConnector } from "./mysql-connector";

export class MysqlTable {
  TABLE: string;
  db: MysqlConnector;

  constructor(db, table) {
    this.TABLE = table;
    this.db = db;
  }

  async select(where, options = {}) {
    const query = getSelectQuery(this.TABLE, where, options);
    // console.log(query.query, query.values);
    return await this.db.query(query.query, query.values);
  }

  async selectQ(where, options = {}) {
    const query = getSelectQuery(this.TABLE, where, options);
    // console.log(query.query);
    const start = new Date();
    const rows = await this.db.query(query.query, query.values);
    return {
      ...query,
      rows,
      runtime: (new Date().getTime() - start.getTime()) / 1000,
    };
  }

  async selectOne(where, options = {}) {
    const query = getSelectQuery(this.TABLE, where, { ...options, size: 1 });
    // console.log(query.query);
    return (await this.db.query(query.query, query.values))[0];
  }

  async selectOneQ(where, options = {}) {
    const query = getSelectQuery(this.TABLE, where, { ...options, size: 1 });
    // console.log(query.query);
    const row = (await this.db.query(query.query, query.values))[0];
    return { query: query.query, values: query.values, row };
  }

  async insert(data) {
    const query = getInsertQuery(this.TABLE, data);
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async update(data, where) {
    invariant(where, "where missing in update query");
    const query = getUpdateQuery(this.TABLE, data, where);
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async insertUpdate(data, updatePlus = {}, insertPlus = {}) {
    const query = getInsertUpdateQuery(
      this.TABLE,
      data,
      updatePlus,
      insertPlus
    );
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }

  async deleteOne(where) {
    invariant(where, "unable to delete everything");
    const query = getDeleteQuery(this.TABLE, where);
    // console.log(query.query, query.values);
    const res = await this.db.query(query.query, query.values);
    return { ...res, query: query.query, values: query.values };
  }
}
