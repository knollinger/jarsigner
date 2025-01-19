import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { MessageBoxService } from '../../services/message-box.service';

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
  constructor(
    private msgBoxSvc: MessageBoxService) {
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
      // this.addFiles(evt.target.files); // ist ne FileList!!!

      const files = new Array<File>(0);
      for (let i = 0; i < evt.target.files.length; ++i) {
        files.push(evt.target.files[i]);
      }
      this.addFiles(files);
    }
  }

  /**
   * 
   * @param evt 
   */
  onFilesDropped(file: File[]) {
    this.addFiles(file);
  }

  /**
   * 
   * @param files 
   */
  private addFiles(files: File[]) {

    const all = this.files.concat(files);
    const unique = this.makeUnique(all);
    if (this.checkFileTypes(unique)) {
      this.files = unique;
      this.selected.emit(this.files);
    }
  }

  /**
  * Teste den MimeType der Files und liefere alle Files, 
  * welche kein JAR sind.
  * 
  * @param files Alle zu testenden Files
  * @returns true, wenn alles ok ist, sonst false
  */
  private checkFileTypes(files: File[]): boolean {

    const wrongFiles = files.filter(file => {
      return file.type !== 'application/java-archive';
    });

    const result = wrongFiles.length === 0;
    if (!result) {

      let msg = 'Die folgenden Dateien sind keine JAR-Archive und können somit nicht signiert werden: <ul>';
      wrongFiles.forEach(file => {
        msg += `<li>${file.name}</li>`;
      })
      msg += '</ul>Diese Dateien werden ignoriert.';

      this.msgBoxSvc.showErrorBox('Fehlerhafte Datei-Typen', msg);
    }
    return result;
  }

  /**
   * Soll der SelectAll-Button angezeigt werden? 
   */
  get isShowSelectAll(): boolean {

    return this.files.length !== 0 && this.files.length !== this.selectedFiles.size;
  }

  /**
   * Beim klick auf den selectAll-Button werden einfach alle FileNamen
   * in das Set der selectierten FileNamen aufgenommen.
   */
  onSelectAll() {

    this.files.forEach(file => {
      this.selectedFiles.add(file.name)
    });
  }

  /**
   * Soll der deselctAll-Button agezeigt werden?
   */
  get isShowDeselectAll(): boolean {
    return this.selectedFiles.size !== 0;
  }

  /**
   * Beim click auf den DeselectAll-Button wird einfach das Set mit 
   * den selektierten FileNames gelöscht.
   */
  onDeselectAll() {
    this.selectedFiles.clear();
  }

  /**
   * Der Callback für einen Change in der List-Auswahl
   * @param evt 
   */
  onSelectionChange(evt: MatSelectionListChange) {

    const list = evt.source;
    const model = list.selectedOptions;

    model.selected.forEach(option => {
      const file = option.value;
      this.selectedFiles.add(file.name);
    })
  }

  /**
   * Ist ein File selektiert ?
   * @param file 
   * @returns 
   */
  isSelected(file: File): boolean {
    return this.selectedFiles.has(file.name);
  }


  /**
   * Soll der DeleteButton agezeigt werden?
   */
  get isShowDelete(): boolean {

    return this.selectedFiles.size !== 0;
  }

  /**
   * Bei Klick auf den Delete-Button werden aus der Liste aller
   * Files dijenigen entfernt welche als selektiert markiert sind.
   * 
   * Das File selbst wird natürlich nicht gelöscht, nur aus der
   * Liste entfernt.
   */
  onDelete() {

    this.files = this.files.filter(file => {
      const result = this.selectedFiles.has(file.name);
      if (result) {
        this.selectedFiles.delete(file.name);
      }
      return !result;
    })
    this.selectedFiles.clear();
    this.selected.emit(this.files);
  }

  /**
   * Mache ein Array von Files unique. Dazu wird über das
   * Array iteriert. Für jedes File wird geprüft ob ein 
   * File mit diesem Namen bereits gefunden wurde. Wenn 
   * ja, wird es für die neue Liste ignoriert.
   * 
   * @param files 
   * @returns 
   */
  private makeUnique(files: File[]): File[] {

    const seen: Set<string> = new Set<string>();
    return files.filter(file => {

      const result = !seen.has(file.name);
      if (result) {
        seen.add(file.name);
      }
      return result;
    });
  }
}
