import { Component, Input } from '@angular/core';

@Component({
  selector: 'bb-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss'],
})
export class TagCloudComponent {
  @Input() tags?: string[];
}
