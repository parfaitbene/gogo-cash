import { FLOW } from "../utils/utils";
import { BudgetLine } from "./budget-line.model";
import { Exercise } from "./exercise.model";
import { Finance } from "./finance.model";
import { Transaction } from "./transaction.model";

export class Budget implements Finance {
    year: number = (new Date()).getFullYear();
    month: number = (new Date()).getMonth();
    startBalance: number = 0;
    budgetLines: BudgetLine[] = [];
    transactions: Transaction[] = [];

    constructor(year, month, startBalance){
        this.year = year;
        this.month = month;
        this.startBalance = startBalance;
    }

    getFirstDayOfMonth(){
        return new Date(this.year, this.month, 1);
    }

    isCurrent() {
        return (new Date()).getMonth() == this.month && (new Date()).getFullYear() == this.year;
    }

    getTotalExpensivePrevision() {
        let total = 0;

        this.budgetLines.forEach(line => {
            if(line.category.flow == FLOW.OUT){
                total += line.getAmountPrevisionSubTotal();
            }
        });

        return total;
    }

    getTotalExpensiveReal() {
                let total = 0;

        this.budgetLines.forEach(line => {
            if(line.category.flow == FLOW.OUT){
                total += line.getAmountRealSubTotal();
            }
        });
        
        return total;
    }

    getTotalIncomePrevision() {
        let total = 0;

        this.budgetLines.forEach(line => {
            if(line.category.flow == FLOW.IN){
                total += line.getAmountPrevisionSubTotal();
            }
        });
        
        return total;
    }

    getTotalIncomeReal() {
        let total = 0;

        this.budgetLines.forEach(line => {
            if(line.category.flow == FLOW.IN){
                total += line.getAmountRealSubTotal();
            }
        });
        
        return total;
    }

    getExpensiveVariation() {
        return this.getTotalExpensiveReal() - this.getTotalExpensivePrevision();
    }

    getIncomeVariation() {
        return this.getTotalIncomeReal() - this.getTotalIncomePrevision();
    }

    getEndBalance() {
        return this.startBalance + this.getTotalIncomeReal() - this.getTotalExpensiveReal();
    }

    getVariation() {
        return this.getEndBalance() - this.startBalance;
    }
}