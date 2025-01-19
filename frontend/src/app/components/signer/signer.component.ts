import { Component, OnInit } from '@angular/core';
import { SignerService } from '../../services/signer.service';
import { TitlebarService } from '../../services/titlebar.service';
import { MessageBoxService } from '../../services/message-box.service';
import { JarError } from '../../models/sign-jar-response';
import { InputDialogService } from '../../services/input-dialog.service';

@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.css']
})
export class SignerComponent implements OnInit {

  files: File[] = new Array<File>();
  totalSize: number = 0;

  downloadUrl: string = '';

  constructor(
    private signerSvc: SignerService,
    private titlebarSvc: TitlebarService,
    private msgBoxSvc: MessageBoxService,
    private inputDlgSvc: InputDialogService) {

  }

  /**
   * 
   */
  ngOnInit(): void {
    this.titlebarSvc.subTitle = 'Datei-Auswahl';
  }

  /**
   * 
   * @param files 
   */
  onFilesChange(files: File[]) {

    this.files = files;

    this.totalSize = 0;
    files.forEach(file => {
      this.totalSize += file.size;
    });
  }

  /**
   * 
   */
  onSignJars(link: HTMLElement) {

    const title = 'Archiv-Name';
    const label = 'Archiv-Name';
    this.inputDlgSvc.showInputDialog(title, label).subscribe(archiveName => {

      if (archiveName) {

        this.signerSvc.signFiles(this.files).subscribe(rsp => {

          if (rsp.jarErrors.length) {
            this.showErrors(rsp.jarErrors);
          }
          else {
            this.downloadUrl = this.signerSvc.getTaskResultUrl(rsp.taskId, archiveName);
            window.setTimeout(() => {
              link.click();
            }, 1);
          }
        });
      }
    });
  }

  /**
   * 
   * @param errors 
   */
  private showErrors(errors: JarError[]) {

    let msg = 'Folgende Dateien konnten nicht signiert werden: <ul>';
    errors.forEach(error => {
      msg += `<li>${error.jarName}`;
    })
    msg += '</ul>';

    this.msgBoxSvc.showErrorBox('Fehler beim signieren', msg);
  }
}
