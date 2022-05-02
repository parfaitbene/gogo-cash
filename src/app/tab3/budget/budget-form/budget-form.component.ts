import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit {
  myForm: FormGroup;
  budget: Budget;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public budgetService: BudgetService,
    private navController: NavController,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      year: [this.budget.year? this.budget.year : '', Validators.required],
      month: [this.budget.month? this.budget.month : '', Validators.required],
      startBalance: [this.budget.startBalance? this.budget.startBalance : '', Validators.email],
    });
  }

  onSave() {
    let formValue = this.myForm.value;
    this.budget = new Budget(formValue['year'], formValue['month'], formValue['startBalance']);
    
    // this.budgetService.save(this.budget).then(
    //   (budget: Budget) => {
    //     this.navController.navigateForward(['tabs', 'tab2']);
    //   },
    //   async () => {
    //     const alert = await this.alertController.create({
    //       header: 'Erreur',
    //       message: 'Une erreur s\'est produite.',
    //       buttons: ['OK']
    //     });
    
    //     await alert.present();
    //   }
    // );
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
