import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Budget } from 'src/app/models/budget.model';
import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { BudgetComponent } from '../budget/budget.component';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
})
export class BudgetListComponent implements OnInit {
  budgets: Budget[] = [];
  budgetsSubscription: Subscription;

  constructor(
    public modalController: ModalController,
    private budgetService: BudgetService,
    ) { }

  ngOnInit() {
    this.budgetsSubscription = this.budgetService.budgetListSubject.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets;
      }
    );
    this.budgetService.emitBudgetList();
   }

  async onAddBudget() {
    let modal = await this.modalController.create({
      component: BudgetFormComponent,
      componentProps: {
        'budget': new Budget((new Date).getFullYear(), (new Date).getMonth(), 0)
      }
    });

    modal.present();
  }

  async onOpenBudget(budget: Budget) {
    let modal = await this.modalController.create({
      component: BudgetComponent,
      componentProps: {
        'isOpenFromList': true,
        'activeBudget': budget
      }
    });

    await modal.present();
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
  }
}
