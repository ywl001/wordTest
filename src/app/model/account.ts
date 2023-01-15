import { Lawcase } from "./lawcase";

export class Account {
    account: string = '';
    company: string = '';
    createAt: string = '';
    remark: string = '';
    amount: string = ''

    relationLawcase: Lawcase[] = [];

    constructor(account: string, company: string, createAt: string, remark: string, amount: string) {
        this.account = account;
        this.company = company;
        this.createAt = createAt;
        this.remark = remark;
        this.amount = amount
    }

}