import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BudgetLine } from 'src/app/models/budget-line.model';
import { Budget } from 'src/app/models/budget.model';
import { Category } from 'src/app/models/category.model';
import { Transaction } from 'src/app/models/transaction.model';
import { Unit } from 'src/app/models/unit.model';
import { BudgetService } from 'src/app/services/budget.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { FLOW } from 'src/app/utils/utils';
import { BudgetLineListComponent } from '../../budget-line/budget-line-list/budget-line-list.component';
import { TransactionFormComponent } from '../../transaction/transaction-form/transaction-form.component';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { BudgetMenuComponent } from '../budget-menu/budget-menu.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  @Input() isOpenFromList: boolean = false;
  budgets: Budget[];
  budgetsSubscription: Subscription;
  @Input() activeBudget: Budget;
  currentDate = new Date();

  constructor(
    public exerciseSercice: ExerciseService, 
    private budgetService: BudgetService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.budgetService.getBudgetsFromDB();

    this.budgetsSubscription = this.budgetService.budgetListSubject.subscribe(
      (budgets: Budget[]) => {
        this.budgets = budgets;
        this.activeBudget = this.activeBudget? this.activeBudget : this.budgetService.getActive();
      }
    );
    this.budgetService.emitBudgetList();
  }

  ionViewWillEnter() {
    this.activeBudget = this.activeBudget? this.activeBudget : this.budgetService.getActive();
  }

  async onBudgetMenu(ev: any) {
      const modal = await this.modalController.create({
        component: BudgetMenuComponent,
        componentProps: {
          'activeBudget': this.activeBudget
        },
      });
      await modal.present();
  }

  async onAddBudget(){
    const modal = await this.modalController.create({
      component: BudgetFormComponent,
      componentProps: {
        'budget': new Budget((new Date).getFullYear(), (new Date).getMonth(), 0)
      }
    });

    return await modal.present();
  }

  async onUpdateBudget() {
    let modal = await this.modalController.create({
      component: BudgetFormComponent,
      componentProps: {
        'budget': this.activeBudget
      }
    });

    modal.present();
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
              'flow': FLOW.OUT,
              'budget': this.activeBudget,
              'transaction': new Transaction(new BudgetLine(0, new Unit('', ''), 0, new Category('', '', ''), this.activeBudget), 0, new Date, '')
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
              'flow': FLOW.IN,
              'budget': this.activeBudget,
              'transaction': new Transaction(new BudgetLine(0, new Unit('', ''), 0, new Category('', '', ''), this.activeBudget), 0, new Date, '')
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

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.budgetsSubscription.unsubscribe();
  }
}
