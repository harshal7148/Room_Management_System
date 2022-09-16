import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-wrapper',
  templateUrl: './scheme-wrapper.component.html',
  styleUrls: ['./scheme-wrapper.component.scss']
})
export class SchemeWrapperComponent implements OnInit {

  constructor() { }
  @Input() dialogData : any;
  data = "hello";
  link = "http://localhost:9026/schemeMaster_micro-fe.js"

  ngOnInit(): void {
  }

}
