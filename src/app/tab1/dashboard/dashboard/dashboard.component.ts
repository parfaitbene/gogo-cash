import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { BudgetFormComponent } from 'src/app/tab2/budget/budget-form/budget-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  years: string[];
  currentYear: number = (new Date()).getFullYear();
  currentBudget: Budget;
  budgets: Budget[];
  budgetsSubscription: Subscription;
  yearsListSubscription: Subscription;


  constructor(
    public exerciseSercice: ExerciseService, 
    private budgetService: BudgetService,
    public modalController: ModalController
    ) { }

  ngOnInit() {
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
    this.currentBudget = this.budgetService.getActive();
  }

  ionViewWillEnter(){
    this.budgetService.getBudgetsFromDB();
    this.exerciseSercice.getYearsFromDB();
  }

  async onAddBudget(){
    const modal = await this.modalController.create({
      component: BudgetFormComponent,
    });

    return await modal.present();
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
    this.yearsListSubscription.unsubscribe();
  }
}
