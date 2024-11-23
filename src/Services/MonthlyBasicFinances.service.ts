import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyBasicFinancesService {
  private tableName: string = "user_montly_basic_finances";

  constructor(private readonly sql: SQLiteService) { }

  public async addMonthlyBasicFinances(totalFunds: number, fixedCosts: number, grossIncome: number, debt: DebtState): Promise<void> {
    const now = new Date();
    await this.sql.openConnection();
    await this.sql.executeQuery(`
      INSERT INTO ${this.tableName} (totalfunds, fixedcosts, grossincome, debt, month, 'year')
      VALUES (${totalFunds}, ${fixedCosts}, ${grossIncome}, '${debt}', ${now.getMonth()}, ${now.getFullYear()})`);
    await this.sql.closeConnection();
  }

  public async getMonthlyBasicFinances() : Promise<IBasicMonthlyFinances[]> {
    await this.sql.openConnection();
    const records: IBasicMonthlyFinances[] = await this.sql.executeQuery(`SELECT totalfunds, fixedcosts, grossincome, debt, month, 'year' FROM ${this.tableName};`);
    await this.sql.closeConnection();
    return records;
  }

}

export type DebtState = "N" | "M" | "D" | "MD";
export interface IBasicMonthlyFinances {
  totalFunds: number;
  fixedCosts: number;
  grossIncome: number;
  debt: DebtState;
  month: number;
  year: number;
}