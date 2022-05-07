import { Budget } from "./budget.model";
import { Finance } from "./finance.model";

export abstract class Exercise implements Finance {
    // name: string;
    // code: string;
    year: string;
    state: string;
    budgets: Budget[] = [];

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