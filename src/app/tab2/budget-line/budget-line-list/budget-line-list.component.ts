import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BudgetLine } from 'src/app/models/budget-line.model';
import { Budget } from 'src/app/models/budget.model';
import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { BudgetService } from 'src/app/services/budget.service';
import { FLOW } from 'src/app/utils/utils';
import { BudgetLineFormComponent } from '../budget-line-form/budget-line-form.component';

@Component({
  selector: 'app-budget-line-list',
  templateUrl: './budget-line-list.component.html',
  styleUrls: ['./budget-line-list.component.scss'],
})
export class BudgetLineListComponent implements OnInit {
  @Input() flow: string;
  @Input() activeBudget: Budget;
  budgetLines: BudgetLine[] = [];

  constructor(
    public modalController: ModalController,

    ) { }

  ngOnInit() {
    this.budgetLines = this.activeBudget.budgetLines.filter((l) => { return l.category.flow == this.flow });
  }

  async onAddBudgetLine() {
    let modal = await this.modalController.create({
      component: BudgetLineFormComponent,
      componentProps: {
        'flow': this.flow,
        'activeBudget': this.activeBudget,
        'budgetLine': new BudgetLine(0, new Unit('', ''), 0, new Category('', this.flow, ''), this.activeBudget)
      }
    });

    modal.present();
  }

  async onUpdateBudgetLine(budgetLine: BudgetLine) {
    let modal = await this.modalController.create({
      component: BudgetLineFormComponent,
      componentProps: {
        'flow': this.flow,
        'activeBudget': this.activeBudget,
        'budgetLine': budgetLine
      }
    });

    modal.present();
  }

  getPageTitle() {
    switch (this.flow) {
      case FLOW.IN:
        return 'Prévisions revenu';
      case FLOW.OUT:
        return 'Prévisions dépenses';
      default:
        return 'Planification';
    }
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
}
