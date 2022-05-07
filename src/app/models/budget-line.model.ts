import { Budget } from "./budget.model";
import { Category } from "./category.model";
import { Transaction } from "./transaction.model";
import { Unit } from "./unit.model";

export class BudgetLine {
    id: number;
    quantity: number;
    unit: Unit;
    amountPrevision: number;
    budget: Budget;
    category: Category;
    transactions: Transaction[] = [];
    
    constructor(quantity, unit, amountPrevision, category, budget) {
        this.quantity = quantity;
        this.unit = unit;
        this.amountPrevision = amountPrevision;
        this.category = category;
        this.budget = budget;
    }

    getVariation(){
        return this.getAmountRealSubTotal() - this.getAmountPrevisionSubTotal();
    }

    getAmountRealSubTotal(){
        let total = 0;

        this.transactions.forEach(
            (t: Transaction) => {
                if(t.budgetLine == this && t.budgetLine.category == this.category){ total += t.amount; }
            }
        );

        return total;
    }

    getAmountPrevisionSubTotal(){
        return this.quantity * this.amountPrevision;
    }
}