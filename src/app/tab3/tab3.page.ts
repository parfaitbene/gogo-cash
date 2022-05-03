import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FLOW } from '../utils/utils';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public modalController: ModalController,
  ) {}

  async onExpenseCategory(){
    let modal = await this.modalController.create({
      component: CategoryListComponent,
      componentProps: {
        'flow': FLOW.OUT
      }
    });
    
    return await modal.present();
  }

  async onIncomeCategory(){
    let modal = await this.modalController.create({
      component: CategoryListComponent,
      componentProps: {
        'flow': FLOW.IN
      }
    });
    
    return await modal.present();
  }

  async onUnitOfMeasure(){
    let modal = await this.modalController.create({
      component: UnitListComponent,
    });
    
    return await modal.present();
  }
}
