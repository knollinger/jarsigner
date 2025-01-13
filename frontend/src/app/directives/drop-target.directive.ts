import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';


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
    else {
      const files = dataTransfer.files;
      dataTransfer.clearData();
    }
    this.filesDropped.emit(files);
  }
}
