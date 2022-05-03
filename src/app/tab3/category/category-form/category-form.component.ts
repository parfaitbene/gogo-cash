import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { FLOW } from 'src/app/utils/utils';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  myForm: FormGroup;
  @Input() category: Category;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: [this.category.name? this.category.name : '', Validators.required],
      icon: [this.category.icon? this.category.icon : ''],
    });
  }

  onSave() {
    let formValue = this.myForm.value;
    this.category = new Category(formValue['name'], this.category.flow, formValue['icon']);
    
    this.categoryService.save(this.category).then(
      (category: Category) => {
        this.modalController.dismiss();
      },
      async () => {
        const alert = await this.alertController.create({
          header: 'Erreur',
          message: 'Une erreur s\'est produite.',
          buttons: ['OK']
        });
    
        await alert.present();
      }
    );
  }

  getPageTitle() {
    switch (this.category.flow) {
      case FLOW.IN:
        return 'Catégorie de revenu';
      case FLOW.OUT:
        return 'Catégorie de dépense';
      default:
        return 'Catégorie';
    }
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }
}
