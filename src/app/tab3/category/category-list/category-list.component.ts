import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { FLOW } from 'src/app/utils/utils';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() flow: string;
  categories: Category[] = [];
  categoriesSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    public modalController: ModalController,

    ) { }

  ngOnInit() {
    this.categoriesSubscription = this.categoryService.categoryListSubject.subscribe(
      (categories: Category[]) => { 
        this.categories = categories.filter((c) => { return c.flow == this.flow });
      }
    );
    this.categoryService.emitCategoryList();
  }

  async onAddCategory() {
    let modal = await this.modalController.create({
      component: CategoryFormComponent,
      componentProps: {
        'category': new Category('', this.flow, '')
      }
    });

    modal.present();
  }

  async onUpdateCategory(category: Category) {
    let modal = await this.modalController.create({
      component: CategoryFormComponent,
      componentProps: {
        'category': category
      }
    });

    modal.present();
  }

  getPageTitle() {
    switch (this.flow) {
      case FLOW.IN:
        return 'Catégories de revenu';
      case FLOW.OUT:
        return 'Catégories de dépense';
      default:
        return 'Catégories';
    }
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
