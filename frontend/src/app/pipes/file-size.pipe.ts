import { Pipe, PipeTransform } from '@angular/core';

/**
 * Eine Pipe, welche einen numerischen Wert in eine menschenlesbare
 * Form für Dateigrößen überführt.
 * 
 * Statt 1024 Bytes wird also '1 KB' ausgespuckt, statt 1258291,2 Bytes
 * wird 1.3 MB ausgespuckt.
 * 
 * EIn bisserl wird hin und her gerundet.
 */
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
