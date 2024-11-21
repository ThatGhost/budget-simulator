import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private platform: string;
  private dbName: string = "";

  constructor() {
    this.platform = Capacitor.getPlatform();
  }

  async initializeWebPlugin(): Promise<void> {
    if (this.platform === 'web') {
      const jeepEl = document.querySelector('jeep-sqlite');
      if (jeepEl != null) {
        await CapacitorSQLite.initWebStore();
        console.log('Web store initialized for SQLite.');
      } else {
        throw new Error('The jeep-sqlite element is not present in the DOM!');
      }
    }
  }

  async createConnection(): Promise<void> {
    try {
      await CapacitorSQLite.createConnection({ database: this.dbName });
      console.log(`Connection created for database: ${this.dbName}`);
    } catch (error) {
      console.error('Error creating database connection:', error);
      throw error;
    }
  }

  async openConnection(): Promise<void> {
    try {
        await CapacitorSQLite.open({ database: this.dbName, readonly: false});
        console.log(`Database ${this.dbName} opened.`);
    } catch (error) {
      console.error('Error opening database connection:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    try {
        await CapacitorSQLite.close({database: this.dbName, readonly: false});
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }

  async executeQuery(statement: string, values: any[] = []): Promise<any[]> {
    try {
        return (await CapacitorSQLite.query({database: this.dbName, readonly: false, statement: statement, values: values})).values ?? [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async GetOne(statement: string, values: any[] = []): Promise<any | undefined> {
    try {
        const result: any[] | undefined = (await CapacitorSQLite.query({database: this.dbName, readonly: false, statement: statement, values: values})).values;
        return result === undefined ? undefined : result[0];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async isDatabaseOpen(): Promise<boolean> {
    try {
      const result = await CapacitorSQLite.isDBOpen({database: this.dbName, readonly: false});
      return result.result ?? false;
    } catch (error) {
      throw error;
    }
  }

  async doesTableExist(table: string): Promise<boolean> {
    try {
      const result = await CapacitorSQLite.getTableList({database: this.dbName, readonly: false});
      return result.values?.includes(table) ?? false;
    } catch (error) {
      throw error;
    }
  }
}
