import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BudgetLine } from '../models/budget-line.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgetList: Budget[] = [];
  budgetListSubject = new Subject<Budget[]>();
  
  constructor() { }

  emitBudgetList(){
    this.budgetListSubject.next(this.budgetList);
  }

  checkBudgetExist(budget: Budget) {
    let b = this.budgetList.find(b => { 
      return b.month ==  budget.month && b.year == budget.year; 
    });

    return b? true : false;
  }

  getActive() {
    return this.budgetList.find(b => {
      return b.isCurrent() || false;
    })
  }

  getBudgetLineById(id: number): BudgetLine {
    return;
  }
  
  saveBudget(budget: Budget){
    return new Promise(
      (resolve, reject) => {
        this.budgetList.push(budget);
        this.emitBudgetList();

        resolve(budget);
      }
    );
  }

  saveBudgetLine(budgetLine: BudgetLine){
    return new Promise(
      (resolve, reject) => {
        budgetLine.budget.budgetLines.push(budgetLine);
        this.budgetList.find(
          (b, index)=> { 
            if(b == budgetLine.budget){ 
              this.budgetList[index] = budgetLine.budget;
            }
          });
        this.emitBudgetList();

        resolve(budgetLine);
      }
    );
  }
}
