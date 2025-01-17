import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

/**
 * Eine Direktive, welche dem damit annotierten HTMLElement folgende
 * Eigenschafften zuweist:
 * 
 * * Das Element wird als Ziel einer Drop-Operation enabled
 * * Um dies zu visualisieren wird eine Border von 3px um das Element gelegt.
 * * Diese border ist im Normalfall transparent, sobald ein Drag erfolgt wird die
 *   Border auf dashed mit der Farbe #d0d0d0 gesetzt.
 * * Bei einem Drop löst die Direktive das Event **filesDropped** aus, als Parameter
 *   des Events wird ein Array von *File*-Objekten übergeben.
 */
@Directive({
  selector: '[appDropTarget]'
})
export class DropTargetDirective {

  @HostBinding('style.borderStyle') style = 'dashed';
  @HostBinding('style.borderWidth') size = '3px';
  @HostBinding('style.borderColor') color = 'transparent';

  @Output()
  filesDropped: EventEmitter<File[]> = new EventEmitter<File[]>();

  /**
   *
   * @param el die ElementReferenz auf das mit der Direktive versehene Element
   */
  constructor() {
  }

  /**
   *
   */
  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    this.color = '#d0d0d0';
  }

  /**
   *
   */
  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    this.color = 'transparent';
  }

  /**
   * EIn Drop ist aufgetreten. Packe alle File-Objekte
   * aus dem Drop in ein File-Array und funke dieses Array 
   * als Event nach draußen.
   * 
   * @param event
   */
  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {

    evt.stopPropagation();
    evt.preventDefault();
    this.color = 'transparent';
    const dataTransfer: DataTransfer = evt.dataTransfer!;

    const files: File[] = new Array<File>();
    if (dataTransfer.items) {

      for (let i = 0; i < dataTransfer.items.length; i++) {
      
        if (dataTransfer.items[i].kind === 'file') {

          const file = dataTransfer.items[i].getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }
      dataTransfer.items.clear();
    }
    this.filesDropped.emit(files);
  }
}
