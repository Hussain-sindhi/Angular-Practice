import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  imports: [CommonModule],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child implements OnInit, OnChanges, OnDestroy {
  @Input() msg: string = '';
  @Output() datasent = new EventEmitter<string>();

  constructor() {
    console.log("Constructor");
  }
  ngOnInit() {
    console.log("OnInit");
  }
  ngOnChanges() {
    console.log("OnChanges");
  }
  ngOnDestroy() {
    console.log("OnnDestroy");
  }

replyToParent() {
  this.datasent.emit("Data from child component"); 
  }

}
