import { Injectable } from '@angular/core';
import { from, of, Subject } from 'rxjs';
import { BudgetLine } from '../models/budget-line.model';
import { Budget } from '../models/budget.model';
import { CapacitorSQLite  } from '@capacitor-community/sqlite';
import { DatabaseService } from './database.service';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgetList: Budget[] = [];
  budgetListSubject = new Subject<Budget[]>();
  
  constructor(
    private databaseService: DatabaseService,
    public storageService: StorageService,
  ) { 
  }

  setBudgetList(budgetList: Budget[])
  {
    this.budgetList = budgetList;
    this.emitBudgetList()
  }

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
        this.addBudget(budget);
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

    ////////////////////////////////////////
   //          DATABASE METHODS          //
  ////////////////////////////////////////

  getBudgetList()
  {
    return this.databaseService.dbReady.pipe(
      switchMap(isReady => {
        if (!isReady) {
          return of({ values: [] });
        } else {
          const statement = 'SELECT * FROM Budget;';
          return from(CapacitorSQLite.query({ statement, values: [], database: this.databaseService.getDBName() }));
        }
      })
    )
  }

  getBudgetsFromDB()
  {
    this.databaseService.dbReady.subscribe((isReady) => {
      if(isReady){
        this.getBudgetList().subscribe((res) => {
          this.budgetList = [];
          res.values.forEach(value => {
            this.budgetList.push(new Budget(value.year, value.month, value.startBalance));
          });
          this.setBudgetList(this.budgetList);
        });
      }
    });
  }

  async addBudget(budget: Budget) {
    const statement = `INSERT INTO Budget (year, month, startBalance) VALUES (${budget.year}, ${budget.month}, ${budget.startBalance});`;
    return CapacitorSQLite.execute({ statements: statement, database: this.databaseService.getDBName() });
  }
   
  deleteBudget(budgetId: number) {
    const statement = `DELETE FROM Budget WHERE id = ${budgetId};`;
    return CapacitorSQLite.execute({ statements: statement, database: this.databaseService.getDBName() });
  }
   
}
