import { Performance } from './../../performance';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { DbService } from '../../services/db.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private dialog: MatDialogRef<UploadComponent>, private db: DbService) { }

  selectedFile: File = null;
  selectedSound: File = null;

  ngOnInit() {
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onSoundSelected(event) {
    this.selectedSound = <File>event.target.files[0];
  }
  close() {
    this.dialog.close();
  }
  save(form: NgForm) {
    const image = <Performance>({
      title: form.controls.title.value,
      description: form.controls.description.value,
      imgURL: '',
      orderid:  Math.floor((Math.random() * 1000) + 50)
    });
    this.db.createPerformance(image, this.selectedFile, this.selectedSound);
    this.dialog.close();
  }
}
