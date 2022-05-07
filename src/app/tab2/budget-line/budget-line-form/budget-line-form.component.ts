import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BudgetLine } from 'src/app/models/budget-line.model';
import { Budget } from 'src/app/models/budget.model';
import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { BudgetService } from 'src/app/services/budget.service';
import { CategoryService } from 'src/app/services/category.service';
import { UnitService } from 'src/app/services/unit.service';
import { FLOW } from 'src/app/utils/utils';

@Component({
  selector: 'app-budget-line-form',
  templateUrl: './budget-line-form.component.html',
  styleUrls: ['./budget-line-form.component.scss'],
})
export class BudgetLineFormComponent implements OnInit {
  @Input() flow: string;
  @Input() activeBudget: Budget;
  @Input() budgetLine: BudgetLine;
  categoriesSubscription: Subscription;
  categories: Category[] = [];
  categoriesNames: string[] = [];
  myForm: FormGroup;
  units: Unit[] = [];
  unitsSubscription: Subscription;

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private unitService: UnitService,
    private budgetService: BudgetService,
  ) { }
  
  ngOnInit(): void {
    this.categoriesSubscription = this.categoryService.categoryListSubject.subscribe(
      (categories: Category[]) => { 
        this.categories = categories.filter((c) => { return c.flow == this.flow });
      }
    );
    this.categoryService.emitCategoryList();
  
    this.unitsSubscription = this.unitService.unitListSubject.subscribe(
      (units: Unit[]) => { 
        this.units = units;
      }
    );
    this.unitService.emitUnitList();
    
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      quantity: [this.budgetLine.quantity? this.budgetLine.quantity : '', Validators.required],
      unitId: [this.budgetLine.unit.id? this.budgetLine.unit.id : '', Validators.required],
      amountPrevision: [this.budgetLine.amountPrevision? this.budgetLine.amountPrevision : '', Validators.required],
      categoryId: [this.budgetLine.category.id? this.budgetLine.category.id : '', Validators.required],
    });
  }

  onSave() {
    let formValue = this.myForm.value;
    this.budgetLine = new BudgetLine(
      formValue['quantity'], 
      this.unitService.getUnitById(+formValue['unitId']), 
      formValue['amountPrevision'], 
      this.unitService.getUnitById(+formValue['categoryId']),
      this.activeBudget
      );
    
    this.budgetService.saveBudgetLine(this.budgetLine).then(
      (budgetLine: BudgetLine) => {
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
    switch (this.flow) {
      case FLOW.IN:
        return 'Prévision revenu';
      case FLOW.OUT:
        return 'Prévision dépense';
      default:
        return 'Ligne de budget';
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    this.unitsSubscription.unsubscribe();
  }
}
