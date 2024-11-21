import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { UserTableMigration } from './migrations/UserTableMigration';

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
    }

    this.migrations.forEach(async (migration) => {
      const migrationName = migration.name.toString();
      console.log(migrationName);

      const existingMigration = await this.sqliteService.executeQuery(`SELECT * from ${migrationsTableName} WHERE name = '${migrationName}'`);

      if(existingMigration?.succeeded === 0) {
        try{
          await migration.Run();
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 1)`);
        } catch {
          await this.sqliteService.executeQuery(`INSERT INTO ${migrationsTableName} (name, succeeded) VALUES ('${migrationName}', 0)`);
        }
      }
    });

    await this.sqliteService.closeConnection();
  }
}
