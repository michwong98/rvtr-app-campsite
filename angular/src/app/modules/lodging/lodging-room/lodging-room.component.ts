import { Component, OnInit, Input } from '@angular/core';
import { Bedroom } from '../../../data/bedroom.model';

@Component({
  selector: 'uic-lodging-room',
  templateUrl: './lodging-room.component.html',
    styleUrls: ['./lodging-room.component.scss']
})
export class LodgingRoomComponent implements OnInit {

  @Input() room: Bedroom;

  constructor() { }

  ngOnInit(): void {
  }

  getIconName(amenity: string): string {
    if (amenity === 'Pool') {
      return 'swimmer';
    }
    else {
      return amenity.toLowerCase();
    }
  }
}
