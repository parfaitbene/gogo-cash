import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryList: Category[] = [];
  categoryListSubject = new Subject<Category[]>();
  
  constructor() { }

  emitCategoryList(){
    this.categoryListSubject.next(this.categoryList);
  }

  getUnitById(id: number) {
    // To implement
    // return corresponding category in DB
    return new Category('', '', '');
  }

  getCategoriesByFlow(flow) {
    return new Promise(
      (resolve, reject) => {
        let categories = this.categoryList.filter(c => {
          c.flow == flow;
        });
        resolve(categories);
      }
    );
  }
  
  save(category: Category){
    return new Promise(
      (resolve, reject) => {
        this.categoryList.push(category);
        this.emitCategoryList();

        resolve(category);
      }
    );
  }
}
