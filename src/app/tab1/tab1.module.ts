import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BudgetFormComponent } from '../tab3/budget/budget-form/budget-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, DashboardComponent, BudgetFormComponent]
})
export class Tab1PageModule {}
