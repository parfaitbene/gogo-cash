import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';
import { UnitFormComponent } from '../unit-form/unit-form.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  units: Unit[] = [];
  unitsSubscription: Subscription;

  constructor(
    private unitService: UnitService,
    public modalController: ModalController,
    ) { }

  ngOnInit() {
    this.unitsSubscription = this.unitService.unitListSubject.subscribe(
      (units: Unit[]) => { 
        this.units = units;
      }
    );
    this.unitService.emitUnitList();
  }

  async onAddUnit() {
    let modal = await this.modalController.create({
      component: UnitFormComponent,
      componentProps: {
        'unit': new Unit('', '')
      }
    });

    modal.present();
  }

  async onUpdateUnit(unit: Unit) {
    let modal = await this.modalController.create({
      component: UnitFormComponent,
      componentProps: {
        'unit': unit
      }
    });

    modal.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.unitsSubscription.unsubscribe();
  }
}
