import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent implements OnInit {

  files: File[] = new Array<File>(0);
  selectedFiles: Set<string> = new Set<string>();

  @Output()
  selected: EventEmitter<File[]> = new EventEmitter<File[]>();

  /**
   * 
   */
  constructor() { 

  }

  /**
   * 
   */
  ngOnInit(): void {
  }

  /**
   * 
   * @param evt 
   */
  onFilesSelected(evt: any) {

    if (evt.target && evt.target.files) {
      this.fillFiles(evt.target.files);
    }
  }

  /**
   * 
   * @param evt 
   */
  onFilesDropped(file: File[]) {
    this.fillFiles(file);
  }

  /**
   * 
   * @param files 
   */
  private fillFiles(files: File[] | FileList) {

    const result = new Array<File>(0);
    for (let i = 0; i < files.length; ++i) {
      result.push(files[i]);
    }
    const all = this.files.concat(result);
    this.files = this.makeUnique(all);
    this.selectedFiles = new Set<string>();
    this.selected.emit(this.files);
  }

   /**
   * 
   */
   get isShowSelectAll(): boolean {

    return this.files.length !== 0 && this.files.length !== this.selectedFiles.size;
  }

  /**
   * 
   */
  onSelectAll() {
  
    const selectedFiles = new Set<string>();
    this.files.forEach(file => {
      selectedFiles.add(file.name)
    });
    this.selectedFiles = selectedFiles;
  }

  /**
   * 
   */
  get isShowDeselectAll(): boolean {

    return this.selectedFiles.size !== 0;
  }

  /**
   * 
   */
  onDeselectAll() {
    this.selectedFiles = new Set<string>();
  }

  /**
   * 
   * @param evt 
   */
  onSelectionChange(evt: MatSelectionListChange) {

    const list = evt.source;
    const model = list.selectedOptions;

    const selectedFiles: Set<string> = new Set<string>();
    model.selected.forEach(option => {
      const file = option.value;
      selectedFiles.add(file.name);
    })
    this.selectedFiles = selectedFiles;
  }

  /**
   * 
   * @param file 
   * @returns 
   */
  isSelected(file: File): boolean {
    return this.selectedFiles.has(file.name);
  }


  /**
   * 
   */
  get isShowDelete(): boolean {

    return this.selectedFiles.size !== 0;
  }
  
  /**
   * 
   */
  onDelete() {

    this.files = this.files.filter(file => {
      const result = this.selectedFiles.has(file.name);
      if(result) {
        this.selectedFiles.delete(file.name);
      } 
      return !result;
    })
    this.selected.emit(this.files);
  }
 
  /**
   * 
   * @param files 
   * @returns 
   */
  private makeUnique(files: File[]): File[] {

    const seen: Set<string> = new Set<string>();
    return  files.filter(file => {
      console.log('check ' + file.name);

      const result = !seen.has(file.name);
      if(result) {
        seen.add(file.name);
      }
      return result;
    });
  }
}
