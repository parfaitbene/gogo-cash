import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
})
export class UnitFormComponent implements OnInit {
  myForm: FormGroup;
  @Input() unit: Unit;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private unitService: UnitService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      name: [this.unit.name? this.unit.name : '', Validators.required],
      symbol: [this.unit.symbol? this.unit.symbol : ''],
    });
  }

  onSave() {
    let formValue = this.myForm.value;
    this.unit = new Unit(formValue['name'], formValue['symbol']);
    
    this.unitService.save(this.unit).then(
      (unit: Unit) => {
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

  dismissModal() {
    this.modalController.dismiss();
  }
}
