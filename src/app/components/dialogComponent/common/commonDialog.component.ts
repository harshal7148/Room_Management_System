import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-commonDialog',
  templateUrl: './commonDialog.component.html',
  styleUrls: ['./commonDialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data :any,
  ) { }

  @Input() dialogData : any;

  ngOnInit(): void {
    console.log(this.data);
    //this.dialogData = this.data;
  }

}
