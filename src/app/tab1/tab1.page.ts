import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BudgetFormComponent } from '../tab3/budget/budget-form/budget-form.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalController: ModalController) {}

  async addBudget(){
    const modal = await this.modalController.create({
      component: BudgetFormComponent,
    });

    return await modal.present();
  }
}
