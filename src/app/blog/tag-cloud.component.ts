import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bb-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.css']
})
export class TagCloudComponent implements OnInit {
  @Input() tags?: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
