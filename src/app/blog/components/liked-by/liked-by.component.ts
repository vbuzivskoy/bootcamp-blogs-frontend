import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../../auth';

@Component({
  selector: 'bb-liked-by',
  templateUrl: './liked-by.component.html',
  styleUrls: ['./liked-by.component.scss'],
})
export class LikedByComponent {
  @Input() likedBy!: User[];
  @Input() isLikedByUser?: boolean;
  @Output() likedByClicked = new EventEmitter();

  onClick(): void {
    this.likedByClicked.emit();
  }
}
