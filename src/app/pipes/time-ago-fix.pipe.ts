import { Pipe, PipeTransform } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';

@Pipe({
  name: 'timeAgo'
})
export class TimeagoFixPipe extends TimeAgoPipe implements PipeTransform {

  override transform(value: Date | string): string {
    return super.transform(value.toString());
  }
}