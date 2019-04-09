import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit =  new EventEmitter();
  progress = 0;
  timer: number;


  constructor(private popUp: MatDialog ) { }

  ngOnInit() {
    this.startResumeTimer();
  }
  startResumeTimer(){
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 400);

  }

  stopTraining() {
    clearInterval(this.timer);
    const dialogRef = this.popUp.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startResumeTimer();
      }
    });
  }

}
