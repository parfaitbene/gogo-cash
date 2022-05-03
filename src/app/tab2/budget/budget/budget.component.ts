import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { FLOW } from 'src/app/utils/utils';
import { BudgetLineListComponent } from '../../budget-line/budget-line-list/budget-line-list.component';
import { TransactionFormComponent } from '../../transaction/transaction-form/transaction-form.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  budgets: Budget[];
  budgetsSubscription: Subscription;
  activeBudget: Budget;

  constructor(
    public exerciseSercice: ExerciseService, 
    private budgetService: BudgetService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) { }

  ngOnInit(): void {
    this.budgetsSubscription = this.budgetService.budgetListSubject.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets;
        this.activeBudget = this.budgetService.getActive();
      }
    );
    this.budgetService.emitBudgetList();
  }

  async onAddTransaction() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ajouter une transaction',
      buttons: [{
        text: 'Dépense',
        icon: 'bag-remove-outline',
        handler: async () => {
          let modal = await this.modalController.create({
            component: TransactionFormComponent,
            componentProps: {
              'flow': FLOW.OUT
            }
          });
          
          return await modal.present();
        }
      }, {
        text: 'Revenu',
        icon: 'bag-add-outline',
        handler: async () => {
          let modal = await this.modalController.create({
            component: TransactionFormComponent,
            componentProps: {
              'flow': FLOW.IN
            }
          });
          
          return await modal.present();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  async onScheduleExpense(){
    let modal = await this.modalController.create({
      component: BudgetLineListComponent,
      componentProps: {
        'flow': FLOW.OUT,
        'activeBudget': this.activeBudget
      }
    });
    
    return await modal.present();
  }

  async onScheduleIncome(){
    let modal = await this.modalController.create({
      component: BudgetLineListComponent,
      componentProps: {
        'flow': FLOW.IN,
        'activeBudget': this.activeBudget
      }
    });
    
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
  }
}
