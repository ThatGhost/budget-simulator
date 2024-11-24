import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private readonly tableName: string = "debt";

  constructor(
    private readonly sql: SQLiteService
  ) { }

  public async AddDebt(isMortgage: boolean, total: number, percent: number, time: number, payedOff: number, type: DebtType | MortgageType) {
    await this.sql.openConnection();

    await this.sql.executeQuery(`INSERT INTO ${this.tableName} (isMortgage, total, percent, time, payedoff, type)
      VALUES (${isMortgage ? 1 : 0}, ${total}, ${percent}, ${time}, ${payedOff}, '${type}')`);
    
    await this.sql.closeConnection();
  }

  public async UpdateDebt(id: number, isMortgage: boolean, total: number, percent: number, time: number, payedOff: number, type: DebtType | MortgageType) {
    await this.sql.openConnection();

    await this.sql.executeQuery(`UPDATE ${this.tableName}
      SET isMortgage = ${isMortgage ? 1 : 0}, 
      total = ${total}, 
      percent = ${percent}, 
      time = ${time}, 
      payedoff = ${payedOff}, 
      type = '${type}'
      WHERE id = ${id}`);
      
    await this.sql.closeConnection();
  }

  public async GetDebt(id: number = -1): Promise<MortgageType[]> {
    await this.sql.openConnection();

    const response = this.sql.executeQuery(`
      SELECT isMortgage, total, percent, time, payedoff, type
      FROM ${this.tableName}
      ${id === -1 ? "" : `WHERE id = ${id}`}
      `);
    await this.sql.closeConnection();
    return response;
  }
}

export type DebtType = "PL" | "FC" | "R" | "PL" | "C" | "L" | "BB";
export type MortgageType = "F" | "R" | "P";
export interface IDebt {
  id: number,
  isMortgage: boolean,
  total: number,
  percent: number,
  time: number,
  payedoff: number,
  type: string
}
