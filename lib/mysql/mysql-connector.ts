import mysql from "mysql2/promise";
import { MysqlTable } from "./mysql-table";
import chalk from "chalk";

export class MysqlConnector {
  config;
  connection;

  constructor(config, setTimeZone = true) {
    this.config = config;
    this.connection = mysql.createPool(config);
    this.connection.on("error", function (err) {
      console.error("MYSQL Error event triggered. Connection is dead: ", err);
    });

    if (setTimeZone) {
      this.query("SET time_zone = 'America/New_York'", []);
    }
  }

  getTable(tableName) {
    return new MysqlTable(this, tableName);
  }

  async query(sql, args = []) {
    const [rows] = await this.connection.query(sql, args);
    return rows;
  }

  async close() {
    await this.connection.end();
  }

  async transaction(code) {
    await this.query("BEGIN");
    try {
      await code();
      await this.query("COMMIT");
    } catch (e) {
      await this.query("ROLLBACK");
    }
  }

  async getTableFields(tableName) {
    try {
      return await this.query("DESCRIBE " + tableName);
    } catch (e) {
      console.log("getTableFields", this.config);
    }
  }

  async runInsideTransaction(someCode) {
    await this.query("START TRANSACTION");
    console.log(chalk.blueBright("[MYSQL] => STARTED TRANSACTION"));
    try {
      const res = await someCode();
      await this.query("COMMIT");
      console.log(chalk.blueBright("[MYSQL] => TRANSACTION COMMITTED"));
      return res;
    } catch (e) {
      console.log(chalk.red("[MYSQL TRANSACTION ROLLBACK]", e?.message));
      await this.query("ROLLBACK");
      throw e;
    }
  }
}
