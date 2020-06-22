import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-lodgings-list',
  templateUrl: './lodgings-list.component.html'
})
export class LodgingsListComponent implements OnInit {
  /**
   * List of lodgings to be displayed to the user
   */
  @Input() lodgings: Lodging[];
  /**
   * Click handler for a lodging item.  Will send the lodging's data and the mouse event when clicked.
   */
  @Output() lodgingClickHandler = new EventEmitter<{ lodging: Lodging }>();

  constructor() { }

  ngOnInit(): void { }

  /**
   * Creates a 2-dimensional array of lodgings from the original 1D lodging array. Used to format lodging items to display in the template.
   * @param lodgings Lodging array to convert.
   * @param n Number of lodgings items to display per row.
   */
  public lodgingsRow(lodgings: Lodging[], n: number): Lodging[][] {
    if (lodgings === null) {
      return [];
    }
    return lodgings.reduce((accumulator, currentLodge, index, array) => {
      if (index % n === 0) {
        const lodgingsSubarry = [];
        for (let i = index; i < index + n; i++) lodgingsSubarry.push(array[i]);
        accumulator.push(lodgingsSubarry);
      }
      return accumulator;
    }, []);
  }

  /**
   * Fires when a lodging tile was clicked.  Emits the click event for the parent to use.
   * @param event the event fired when clicked
   * @param lodging The lodging's data in regards to the item that was clicked
   */
  public triggerLodgingClick(lodging: Lodging): void {
    this.lodgingClickHandler.emit({ lodging });
  }
}
