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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab3Page, CategoryListComponent, CategoryFormComponent, UnitListComponent, UnitFormComponent]
})
export class Tab3PageModule {}
