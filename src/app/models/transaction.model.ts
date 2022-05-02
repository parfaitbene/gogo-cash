import { STATE } from "../utils/utils";
import { BudgetLine } from "./budget-line.model";

export class Transaction {
    type: string;
    name: string;
    desctiption: string;
    date: Date;
    amount: number;
    state: string;
    budgetLine: BudgetLine;

    constructor(name: string, date: Date, amount: number, description: string, type: string){
        this.name = name;
        this.date = date;
        this.amount = amount;
        this.desctiption = description;
        this.type = type;
    }

    setToDone(){ this.state = STATE.DONE; }

    setToDraft(){ this.state = STATE.DRAFT; }

    setToCancel(){ this.state = STATE.CANCEL; }
}