import { Budget } from "./budget.model";
import { Unit } from "./unit.model";

export class BudgetLine {
    name: string;
    type: string;
    unit: Unit;
    quantity: number;
    amountPrevision: number;
    amountReal: number;
    budget: Budget;

    getVariation(){
        return this.getAmountReal() - this.getAmountPrevision();
    }

    getAmountReal(){
        return this.quantity * this.amountReal;
    }

    getAmountPrevision(){
        return this.quantity * this.amountPrevision;
    }
}