import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  private units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'EB'];
  private format = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    useGrouping: true,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  /**
   *
   * @param value
   * @returns
   */
  transform(value: number): string {

    let idx = 0;
    while (value > 1024) {

      value /= 1024;
      idx++;
    }
    return this.format.format(value) + ' ' + this.units[idx];
  }
}
