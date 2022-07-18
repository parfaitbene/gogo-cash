import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Budget } from './models/budget.model';
import { BudgetService } from './services/budget.service';
import { DatabaseService } from './services/database.service';
import { ExerciseService } from './services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  budgets: Budget[] = [];
  years: string[];
  budgetsSubscription: Subscription;
  yearsListSubscription: Subscription;

  constructor(
    private platform: Platform,
    private databaseService: DatabaseService,
    private loadingCtrl: LoadingController,
    private budgetService: BudgetService,
    private exerciseSercice: ExerciseService
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    this.budgetService.getBudgetsFromDB();
    this.exerciseSercice.getYearsFromDB();

    this.yearsListSubscription = this.exerciseSercice.yearsListSubject.subscribe(
      (years: string[]) => {
        this.years = years;
      }
    );
    this.exerciseSercice.yearsListSubject.next(this.years);

    this.budgetsSubscription = this.budgetService.budgetListSubject.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets;
      }
    );
    this.budgetService.emitBudgetList();
  }
  
  async initializeApp() {
    this.platform.ready().then(async () => {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      
      this.databaseService.init().then(
        () => {
          this.databaseService.dbReady.subscribe((isReady) => {
            if(isReady){
              loading.dismiss();
            }
          });
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
    this.yearsListSubscription.unsubscribe();
  }
}
