import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BudgetLine } from 'src/app/models/budget-line.model';
import { Budget } from 'src/app/models/budget.model';
import { Category } from 'src/app/models/category.model';
import { Transaction } from 'src/app/models/transaction.model';
import { BudgetService } from 'src/app/services/budget.service';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { FLOW, getFormDefaultDateFromDate } from "src/app/utils/utils";

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Input() flow: string;
  @Input() budget: Budget;
  @Input() transaction: Transaction;
  myForm: FormGroup;
  date: Date;

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private budgetService: BudgetService,
    private transactionService: TransactionService
  ) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let defaultDate = (this.transaction.date)? this.transaction.formatDateToFormData() : getFormDefaultDateFromDate();

    this.myForm = this.formBuilder.group({
      budgetLineId: [this.transaction.budgetLine? this.transaction.budgetLine.id : '', Validators.required],
      amount: [this.transaction.amount? this.transaction.amount : '', Validators.required],
      date: [defaultDate, Validators.required],
      description: [this.transaction.description? this.transaction.description : ''],
    });
  }

  onSave() {
    let formValue = this.myForm.value;
    this.transaction = new Transaction(
      this.budgetService.getBudgetLineById(+formValue['budgetLineId']), 
      formValue['amount'], 
      formValue['date'], 
      formValue['description'],
      );
    
    this.transactionService.save(this.transaction).then(
      (transaction: Transaction) => {
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
        return 'Revenu';
      case FLOW.OUT:
        return 'Dépense';
      default:
        return 'Transaction';
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
  }
}
