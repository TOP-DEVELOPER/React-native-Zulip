// `flowgen --no-inexact --interface-records node_modules/expo-sqlite/build/SQLite.types.d.ts`
// from expo-sqlite 10.0.3
// with s/export type/declare export type/g, and as noted with "Zulip fix" below
declare module 'expo-sqlite/build/SQLite.types' {
  /**
   * Flowtype definitions for SQLite.types
   * Generated by Flowgen from a Typescript Definition
   * Flowgen v1.14.1
   */

   declare export type Window = {|
    openDatabase?: (
      name: string,
      version: string,
      displayName: string,
      estimatedSize: number,
      creationCallback?: DatabaseCallback
    ) => Database,
  |};
  declare export type DatabaseCallback = (database: Database) => void;
  /**
   * `Database` objects are returned by calls to `SQLite.openDatabase()`. Such an object represents a
   * connection to a database on your device.
   */
  declare export type Database = {|
    version: string,

    /**
     * Execute a database transaction.
     * @param callback A function representing the transaction to perform. Takes a Transaction
     * (see below) as its only parameter, on which it can add SQL statements to execute.
     * @param errorCallback Called if an error occurred processing this transaction. Takes a single
     * parameter describing the error.
     * @param successCallback Called when the transaction has completed executing on the database.
     */
    transaction(
      callback: SQLTransactionCallback,
      errorCallback?: SQLTransactionErrorCallback,
      successCallback?: () => void
    ): void,
    readTransaction(
      callback: SQLTransactionCallback,
      errorCallback?: SQLTransactionErrorCallback,
      successCallback?: () => void
    ): void,
  |};
  declare export type SQLTransactionCallback = (transaction: SQLTransaction) => void;
  declare export type SQLTransactionErrorCallback = (error: SQLError) => void;
  /**
   * A `SQLTransaction` object is passed in as a parameter to the `callback` parameter for the
   * `db.transaction()` method on a `Database` (see above). It allows enqueuing SQL statements to
   * perform in a database transaction.
   */
  declare export type SQLTransaction = {|
    /**
     * Enqueue a SQL statement to execute in the transaction. Authors are strongly recommended to make
     * use of the `?` placeholder feature of the method to avoid against SQL injection attacks, and to
     * never construct SQL statements on the fly.
     * @param sqlStatement A string containing a database query to execute expressed as SQL. The string
     * may contain `?` placeholders, with values to be substituted listed in the `arguments` parameter.
     * @param args An array of values (numbers or strings) to substitute for `?` placeholders in the
     * SQL statement.
     * @param callback Called when the query is successfully completed during the transaction. Takes
     * two parameters: the transaction itself, and a `ResultSet` object (see below) with the results
     * of the query.
     * @param errorCallback Called if an error occurred executing this particular query in the
     * transaction. Takes two parameters: the transaction itself, and the error object.
     */
    executeSql(
      sqlStatement: string,
      args?: $ReadOnlyArray<number | string>, // Zulip fix
      callback?: SQLStatementCallback,
      errorCallback?: SQLStatementErrorCallback
    ): void,
  |};
  declare export type SQLStatementCallback = (
    transaction: SQLTransaction,
    resultSet: SQLResultSet
  ) => void;
  declare export type SQLStatementErrorCallback = (
    transaction: SQLTransaction,
    error: SQLError
  ) => boolean;
  declare export type SQLResultSet = {|
    /**
     * The row ID of the row that the SQL statement inserted into the database, if a row was inserted.
     */
    insertId?: number,

    /**
     * The number of rows that were changed by the SQL statement.
     */
    rowsAffected: number,
    rows: SQLResultSetRowList,
  |};
  declare export type SQLResultSetRowList = {|
    /**
     * The number of rows returned by the query.
     */
    length: number,

    /**
     * Returns the row with the given `index`. If there is no such row, returns `null`.
     * @param index Index of row to get.
     */
    item(index: number): any,

    /**
     * The actual array of rows returned by the query. Can be used directly instead of
     * getting rows through rows.item().
     */
    _array: any[],
  |};
  declare export class SQLError {
    static UNKNOWN_ERR: number;
    static DATABASE_ERR: number;
    static VERSION_ERR: number;
    static TOO_LARGE_ERR: number;
    static QUOTA_ERR: number;
    static SYNTAX_ERR: number;
    static CONSTRAINT_ERR: number;
    static TIMEOUT_ERR: number;
    code: number;
    message: string;
  }
  declare export type WebSQLDatabase = {|
    ...$Exact<Database>,

    exec(queries: Query[], readOnly: boolean, callback: SQLiteCallback): void,
  |};
  declare export type Query = {|
    sql: string,
    args: mixed[],
  |};
  declare export type ResultSetError = {|
    error: Error,
  |};
  /**
   * `ResultSet` objects are returned through second parameter of the `success` callback for the
   * `tx.executeSql()` method on a `SQLTransaction` (see above).
   */
  declare export type ResultSet = {|
    /**
     * The row ID of the row that the SQL statement inserted into the database, if a row was inserted.
     */
    insertId?: number,

    /**
     * The number of rows that were changed by the SQL statement.
     */
    rowsAffected: number,
    rows: {|
      [column: string]: any,
    |}[],
  |};
  declare export type SQLiteCallback = (
    error?: Error | null,
    resultSet?: (ResultSetError | ResultSet)[]
  ) => void;
}

// `flowgen --no-inexact --interface-records node_modules/expo-sqlite/build/SQLite.d.ts`
// from expo-sqlite 10.0.3
// with imports fixed up
declare module 'expo-sqlite/build/SQLite' {
  /**
   * Flowtype definitions for SQLite
   * Generated by Flowgen from a Typescript Definition
   * Flowgen v1.14.1
   */

  import type { WebSQLDatabase } from "expo-sqlite/build/SQLite.types";

  /**
   * Open a database, creating it if it doesn't exist, and return a `Database` object. On disk,
   * the database will be created under the app's [documents directory](../filesystem), i.e.
   * `${FileSystem.documentDirectory}/SQLite/${name}`.
   * > The `version`, `description` and `size` arguments are ignored, but are accepted by the function
   * for compatibility with the WebSQL specification.
   * @param name Name of the database file to open.
   * @param version
   * @param description
   * @param size
   * @param callback
   * @return
   */
  declare export function openDatabase(
    name: string,
    version?: string,
    description?: string,
    size?: number,
    callback?: (db: WebSQLDatabase) => void
  ): WebSQLDatabase;
}

declare module 'expo-sqlite' {
  declare export * from 'expo-sqlite/build/SQLite';
  declare export * from 'expo-sqlite/build/SQLite.types';
}
