import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  years: string[];
  currentYear: number = (new Date()).getFullYear();

  constructor(public exerciseSercice: ExerciseService) { }

  ngOnInit() {
    this.years = this.exerciseSercice.getExerciseList();
  }

}
