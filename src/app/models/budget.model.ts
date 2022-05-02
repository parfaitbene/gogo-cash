import { BudgetLine } from "./budget-line.model";
import { Exercise } from "./exercise.model";
import { Finance } from "./finance.model";
import { Transaction } from "./transaction.model";

export class Budget implements Finance {
    year: number = (new Date()).getFullYear();
    month: number = (new Date()).getMonth();
    startBalance: number = 0;
    endBalance: number;
    budgetLines: BudgetLine[] = [];
    transactions: Transaction[] = [];

    constructor(year, month, startBalance){
        this.year = year;
        this.month = month;
        this.startBalance = startBalance;
    }

    isCurrent() {
        return (new Date()).getMonth() == this.month && (new Date()).getFullYear() == this.year;
    }

    getTotalExpensivePrevision() {
        return 0;
    }

    getTotalExpensiveReal() {
        return 0;
    }

    getTotalIncomePrevision() {
        return 0;
    }

    getTotalIncomeReal() {
        return 0;
    }

    getExpensiveVariation() {
        return this.getTotalExpensiveReal() - this.getTotalExpensivePrevision();
    }

    getIncomeVariation() {
        return this.getTotalIncomeReal() - this.getTotalIncomePrevision();
    }
}