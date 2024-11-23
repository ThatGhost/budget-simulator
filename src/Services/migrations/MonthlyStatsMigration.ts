import { IMigration } from "../migration.service";
import { SQLiteService } from "../sqlite.service";

export class MonthlyStatsMigration implements IMigration {
    public name: Symbol = Symbol("MonthlyStatsMigration");

    constructor(private readonly sqliteService: SQLiteService) {}

    public async Run(): Promise<void> {
        const userTableName: string = "user_montly_basic_finances";
        if(await this.sqliteService.doesTableExist(userTableName)) return;

        await this.sqliteService.executeQuery(`CREATE TABLE ${userTableName} 
            ( 
             totalFunds int,
             fixedCosts int,
             grossIncome int,
             debt varchar(2),
             month tinyint,
             'year' smallint
            );`);
    }
}