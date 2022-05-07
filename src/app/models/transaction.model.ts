import { FLOW, getFormDefaultDateFromDate } from "../utils/utils";
import { BudgetLine } from "./budget-line.model";

export class Transaction {
    id: number;
    budgetLine: BudgetLine;
    amount: number;
    date: Date;
    description: string;

    constructor(budgetLine: BudgetLine, amount: number, date: Date, description: string){
        this.budgetLine = budgetLine;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    getFlow() {
        return (this.budgetLine.category.flow == FLOW.IN)? FLOW.IN : FLOW.OUT;
    }

    formatDateToFormData() {
        return getFormDefaultDateFromDate(new Date(this.date));
    }
}