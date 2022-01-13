import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { UserId } from '../../../auth';

@Component({
  selector: 'bb-liked-by',
  templateUrl: './liked-by.component.html',
  styleUrls: ['./liked-by.component.scss'],
})
export class LikedByComponent implements OnChanges {
  @Input() likedBy!: UserId[];
  @Input() userId?: UserId;
  @Output() likedByClicked: EventEmitter<any> = new EventEmitter<any>();
  isLikedByUser: boolean = false;

  onClick(): void {
    if (this.userId) {
      this.likedByClicked.emit();
    }
  }

  ngOnChanges(): void {
    this.isLikedByUser = this.userId
      ? this.likedBy.includes(this.userId)
      : false;
  }
}
