import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitFormComponent } from './unit/unit-form/unit-form.component';
import { BudgetListComponent } from '../tab2/budget/budget-list/budget-list.component';
import { HomeComponent } from '../home/home.component';
import { BudgetComponent } from '../tab2/budget/budget/budget.component';
import { BudgetFormComponent } from '../tab2/budget/budget-form/budget-form.component';
import { BudgetLineListComponent } from '../tab2/budget-line/budget-line-list/budget-line-list.component';
import { BudgetLineFormComponent } from '../tab2/budget-line/budget-line-form/budget-line-form.component';
import { BudgetMenuComponent } from '../tab2/budget/budget-menu/budget-menu.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab3Page,
    HomeComponent,
    BudgetComponent,
    BudgetListComponent,
    BudgetFormComponent,
    BudgetLineListComponent,
    BudgetLineFormComponent,
    BudgetMenuComponent,
    CategoryListComponent,
    CategoryFormComponent,
    UnitListComponent,
    UnitFormComponent]
})
export class Tab3PageModule {}
