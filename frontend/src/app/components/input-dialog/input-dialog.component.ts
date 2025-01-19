import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface IInputDialogData {
  title: string,
  label: string,
  value?: string
}

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  title: string = '';
  label: string = '';
  value: string = '';

  inputForm: FormGroup;

  /**
   * 
   * @param data 
   * @param formBuilder 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: IInputDialogData,
    formBuilder: FormBuilder) {

    /**
     * 
     */
    this.inputForm = formBuilder.group(
      {
        input: new FormControl('', Validators.required)
      }
    );

    this.title = data.title;
    this.label = data.label;
    this.value = data.value || '';
  }

  /**
   * 
   */
  ngOnInit(): void {
  }
}
