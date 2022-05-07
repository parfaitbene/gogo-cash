import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from 'src/app/services/budget.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { getFormDefaultDateFromDate } from "src/app/utils/utils";
import { BudgetComponent } from '../budget/budget.component';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.scss'],
})
export class BudgetFormComponent implements OnInit {
  myForm: FormGroup;
  currentDate = new Date();
  @Input() budget: Budget;
  years: string[];

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    public budgetService: BudgetService,
    private navController: NavController,
    private alertController: AlertController,
    public exerciseSercice: ExerciseService

  ) {
    this.budget = new Budget(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0);
   }

  ngOnInit() {
    this.years = this.exerciseSercice.generateExerciseList();
    this.initForm();
  }

  initForm() {
    let defaultDate = (this.budget.month && this.budget.year)? this.budget.formatDateToFormData() : getFormDefaultDateFromDate();
    
    this.myForm = this.formBuilder.group({
      startBalance: [this.budget.startBalance? this.budget.startBalance : 0],
      date: [defaultDate, Validators.required]
    });
  }

 

  async onSave() {
    let formValue = this.myForm.value;
    let date = new Date(formValue['date']);
    this.budget = new Budget(date.getFullYear(), date.getMonth(), formValue['startBalance']);

    if(!this.budgetService.checkBudgetExist(this.budget)){
      this.budgetService.saveBudget(this.budget).then(
        async (budget: Budget) => {
          this.modalController.dismiss();
          let modal = await this.modalController.create({
            component: BudgetComponent,
            componentProps: {
              'isOpenFromList': true,
              'activeBudget': budget
            }
          });
          await modal.present();
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
    else {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Un budget a déjà été crée pour ce mois dans l\'année indiquée',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
