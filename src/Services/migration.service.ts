import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { UserTableMigration } from './migrations/UserTableMigration';
import _ from 'lodash';
import { MonthlyStatsMigration } from './migrations/MonthlyStatsMigration';
import { DebtMigration } from './migrations/DebtMigration';

export interface IMigration {
  name: Symbol;
  Run(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  private migrations: IMigration[] = [];

  constructor(private readonly sqliteService: SQLiteService) {
    this.migrations.push(new UserTableMigration(sqliteService));
    this.migrations.push(new MonthlyStatsMigration(sqliteService));
    this.migrations.push(new DebtMigration(sqliteService));
  }

  public async RunMigrations() {
    if(!(await this.sqliteService.isDatabaseOpen())) await this.sqliteService.openConnection();

    const migrationsTableName = 'migrations';
    if(!(await this.sqliteService.doesTableExist(migrationsTableName))) {
      await this.sqliteService.executeQuery(`CREATE TABLE ${migrationsTableName} ( name varchar(255), succeeded tinyint(1) )`);
      console.log("created migrations table");
    }

    const existingMigrations: any[] = await this.sqliteService.executeQuery(`SELECT name, succeeded from ${migrationsTableName}`);

    for (const migration of this.migrations) {
      const migrationName = migration.name.toString();
      const migrationInExisting = existingMigrations.filter(m => m.name === migrationName);

      if(migrationInExisting.length === 0 || migrationInExisting[0].succeeded === 0) {
        try{
          await migration.Run();
          console.log(`migration ${migrationName} succeeded`);
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 1)`);
        } catch {
          console.log(`migration ${migrationName} failed`);
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 0)`);
        }
      }
    }

    await this.sqliteService.closeConnection();
  }
}
