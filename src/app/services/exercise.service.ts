import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor() { }

  getExerciseList(){
    return this.getExerciseListFromDB().length?  this.getExerciseListFromDB() : this.generateExerciseList();
  }

  private getExerciseListFromDB(){
    return [];
  }

  private generateExerciseList(date: Date = new Date()){
    let years = [];

    for(let year = date.getFullYear() - 4; year <= date.getFullYear() + 4; year++){ years.push(year); }

    return years;
  }
}
