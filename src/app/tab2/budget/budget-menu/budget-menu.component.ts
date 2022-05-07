import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Budget } from 'src/app/models/budget.model';
import { FLOW } from 'src/app/utils/utils';
import { BudgetLineListComponent } from '../../budget-line/budget-line-list/budget-line-list.component';

@Component({
  selector: 'app-budget-menu',
  templateUrl: './budget-menu.component.html',
  styleUrls: ['./budget-menu.component.scss'],
})
export class BudgetMenuComponent implements OnInit {
  @Input() activeBudget: Budget;

  constructor(    
    public modalController: ModalController
  ) { }

  ngOnInit() {}

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

  dismissModal() {
    this.modalController.dismiss();
  }
}
