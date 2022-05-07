import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Budget } from '../models/budget.model';
import { BudgetFormComponent } from '../tab2/budget/budget-form/budget-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(
    public modalController: ModalController
  ) { }

  async onAddBudget(){
    const modal = await this.modalController.create({
      component: BudgetFormComponent,
      componentProps: {
        'budget': new Budget((new Date).getFullYear(), (new Date).getMonth(), 0)
      }
    });

    return await modal.present();
  }
}
