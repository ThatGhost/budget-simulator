import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { UserTableMigration } from './migrations/UserTableMigration';
import _ from 'lodash';

export interface IMigration {
  name: Symbol;
  Run(): Promise<void>;
}
const nameof = <T>(name: keyof T) => name;

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  private migrations: IMigration[] = [];

  constructor(private readonly sqliteService: SQLiteService) {
    this.migrations.push(new UserTableMigration(sqliteService));
  }

  public async RunMigrations() {
    if(!(await this.sqliteService.isDatabaseOpen())) await this.sqliteService.openConnection();

    const migrationsTableName = 'migrations';
    if(!(await this.sqliteService.doesTableExist(migrationsTableName))) {
      await this.sqliteService.executeQuery(`CREATE TABLE ${migrationsTableName} ( name varchar(255), succeeded tinyint(1) )`);
      console.log("created migrations table");
    }

    const existingMigrations: any[] | undefined = await this.sqliteService.executeQuery(`SELECT name, succeeded from ${migrationsTableName} WHERE`);
    if(existingMigrations === undefined) throw Error("Could not get migrations");

    this.migrations.forEach(async (migration) => {
      const migrationName = migration.name.toString();

      if(!_.includes(existingMigrations, {name: migrationName, succeeded: 1})) {
        try{
          await migration.Run();
          console.log(`migration ${migrationName} succeeded`);
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 1)`);
        } catch {
          console.log(`migration ${migrationName} failed`);
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 0)`);
        }
      }
    });

    await this.sqliteService.closeConnection();
  }
}
