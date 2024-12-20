import { IMigration } from "../migration.service";
import { SQLiteService } from "../sqlite.service";


export class UserTableMigration implements IMigration {
    public name: Symbol = Symbol("UserTableInitializeMigration");

    constructor(private readonly sqliteService: SQLiteService) {}

    public async Run(): Promise<void> {
        const userTableName: string = "user";
        if(await this.sqliteService.doesTableExist(userTableName)) return;

        await this.sqliteService.executeQuery(`CREATE TABLE ${userTableName} 
            ( 
             name varchar(255), 
             country varchar(2), 
             age tinyint, 
             status varchar(1),
             totalfunds int,
             fixedcosts int,
             grossincome int,
             debt varchar(2)
            );`);
        await this.sqliteService.executeQuery(`INSERT INTO ${userTableName} ( name, country, age, status) VALUES ('', '', 0, '');`);
    }
}