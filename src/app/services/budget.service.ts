import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  getActive() {
    this.budgetList.find(b => {
      return b.isCurrent() || false;
    })
  }
  
  save(budget: Budget){
    this.budgetList.push(budget);
    this.emitBudgetList();
  }

  persist(){}
}
