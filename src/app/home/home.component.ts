import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    });

    return await modal.present();
  }
}
