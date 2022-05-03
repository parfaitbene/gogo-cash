import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private unitList: Unit[] = [];
  unitListSubject = new Subject<Unit[]>();
  
  constructor() { }

  emitUnitList(){
    this.unitListSubject.next(this.unitList);
  }

  save(unit: Unit){
    return new Promise(
      (resolve, reject) => {
        this.unitList.push(unit);
        this.emitUnitList();

        resolve(unit);
      }
    );
  }

  getUnitById(id: number) {
    // To implement
    // return corresponding unit in DB
    return new Unit('', '');
  }
}
