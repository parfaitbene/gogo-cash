import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BudgetFormComponent } from '../tab2/budget/budget-form/budget-form.component';
import { HomeComponent } from '../home/home.component';
import { BudgetComponent } from '../tab2/budget/budget/budget.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, HomeComponent, DashboardComponent, BudgetFormComponent, BudgetComponent]
})
export class Tab1PageModule {}
