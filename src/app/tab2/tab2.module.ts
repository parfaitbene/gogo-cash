import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HomeComponent } from '../home/home.component';
import { BudgetFormComponent } from './budget/budget-form/budget-form.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { BudgetComponent } from './budget/budget/budget.component';
import { BudgetLineListComponent } from './budget-line/budget-line-list/budget-line-list.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { UnitListComponent } from '../tab3/unit/unit-list/unit-list.component';
import { UnitFormComponent } from '../tab3/unit/unit-form/unit-form.component';
import { CategoryListComponent } from '../tab3/category/category-list/category-list.component';
import { CategoryFormComponent } from '../tab3/category/category-form/category-form.component';
import { BudgetLineFormComponent } from './budget-line/budget-line-form/budget-line-form.component';
import { BudgetMenuComponent } from './budget/budget-menu/budget-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page,
    HomeComponent,
    BudgetComponent,
    BudgetFormComponent,
    BudgetListComponent,
    BudgetLineFormComponent,
    BudgetLineListComponent,
    BudgetMenuComponent,
    TransactionFormComponent,
    TransactionListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    UnitListComponent,
    UnitFormComponent
  ]
})
export class Tab2PageModule {}
