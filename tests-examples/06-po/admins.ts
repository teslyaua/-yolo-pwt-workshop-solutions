import { Operators } from "./enums";

export class Admin {
  adminName: string;
  adminPassword: string;
  operatorName: Operators;
  adminEmail: string;

  constructor(
    adminName: string,
    adminPassword: string,
    operatorName: Operators,
  ) {
    this.adminName = adminName;
    this.adminPassword = adminPassword;
    this.operatorName = operatorName;
  }
}

export const ygfAdmin = new Admin(
  "iurii.teslia",
  "123",
  Operators.ygf
);
