import { Injectable } from '@angular/core';
import { CapacitorSQLite  } from '@capacitor-community/sqlite';
import { from, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Budget } from '../models/budget.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private yearsList: string[] = [];
  yearsListSubject = new Subject<string[]>();

  constructor(
    private databaseService: DatabaseService,
  ) { 
  }

  generateExerciseList(date: Date = new Date()){
    let years = [];

    for(let year = date.getFullYear() - 4; year <= date.getFullYear() + 4; year++){ years.push(year); }

    return years;
  }

  getYearsList()
  {
    return this.databaseService.dbReady.pipe(
      switchMap(isReady => {
        if (!isReady) {
          return of({ values: [] });
        } else {
          CapacitorSQLite.open({ database: this.databaseService.getDBName() });
          const statement = 'SELECT DISTINCT(year) FROM Budget;';
          return from(CapacitorSQLite.query({ statement, values: [], database: this.databaseService.getDBName() }));
        }
      })
    )
  }

  getYearsFromDB()
  {
    this.databaseService.dbReady.subscribe((isReady) => {
      if(isReady){
        this.getYearsList().subscribe((res) => {
          this.yearsList = [];
          res.values.forEach(value => {
            this.yearsList.push(value.year);
          });
          this.yearsListSubject.next(this.yearsList);
        });
      }
    });
  }
}
