import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly sql: SQLiteService) { }

  public async updateUserData(name: string, country: "BE" | "ES", age: number, status: "S" | "R" | "M" | "K"): Promise<void> {
    await this.sql.openConnection();
    await this.sql.executeQuery(`UPDATE user SET name = '${name}', country = '${country}', age = ${age}, status = '${status}';`);
    await this.sql.closeConnection();
  }

  public async getUserData() : Promise<IUser> {
    await this.sql.openConnection();
    const user: IUser = await this.sql.GetOne(`SELECT name, country, age, status FROM user LIMIT 1;`);
    await this.sql.closeConnection();
    return user;
  }
}

export type UserStatus = "S" | "R" | "M" | "K";
export type Country = "BE" | "ES";
export interface IUser {
  name: string,
  country: Country,
  age: number,
  status: UserStatus
}
