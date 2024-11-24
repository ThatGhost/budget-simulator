import { IMigration } from "../migration.service";
import { SQLiteService } from "../sqlite.service";


export class DebtMigration implements IMigration {
    public name: Symbol = Symbol("DebtMigration");

    constructor(private readonly sql: SQLiteService) {
        
    }

    public async Run(): Promise<void> {
        this.sql.executeQuery(`CREATE TABLE debt (
            id tinyint IDENTITY(1,1) PRIMARY KEY,
            isMortgage bit,
            total int,
            percent decimal(5,3),
            time smallint,
            payedoff int,
            type varchar(2)
            )`);
    }
}