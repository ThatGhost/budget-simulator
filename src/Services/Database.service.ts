import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbConnection?: SQLiteDBConnection;
  private dbName = 'budgetapp';
  constructor() {

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
      if (!this.dbConnection) {
        await CapacitorSQLite.open({ database: this.dbConnection, readonly: false});
        console.log(`Database ${this.dbName} opened.`);
      } else {
        console.warn('Connection already open.');
      }
    } catch (error) {
      console.error('Error opening database connection:', error);
      throw error;
    }
  }

  async closeConnection(): Promise<void> {
    try {
      if (this.dbConnection) {
        await this.dbConnection.close();
        console.log(`Database ${this.dbName} closed.`);
        this.dbConnection = undefined;
      } else {
        console.warn('No connection to close.');
      }
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }

  async executeQuery(statement: string, values: any[] = []): Promise<any> {
    try {
      if (this.dbConnection) {
        const result = await this.dbConnection.query(statement, values);
        console.log('Query executed:', result);
        return result;
      } else {
        throw new Error('Database connection is not open.');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async isDatabaseOpen(): Promise<boolean> {
    try {
      const result = await CapacitorSQLite.isDBOpen({database: this.dbName, readonly: false});
      console.log('Database open status:', result);
      return result.result ?? false;
    } catch (error) {
      console.error('Error checking database open status:', error);
      throw error;
    }
  }
}
