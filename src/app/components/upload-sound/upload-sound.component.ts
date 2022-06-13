import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { DbService } from '../../services/db.service';
import { NgForm } from '@angular/forms';
import { Sound } from '../../sound';

@Component({
  selector: 'app-upload-sound',
  templateUrl: './upload-sound.component.html',
  styleUrls: ['./upload-sound.component.css']
})
export class UploadSoundComponent implements OnInit {

  constructor(private dialog: MatDialogRef<UploadComponent>, private db: DbService) { }

  selectedFile: File = null;

  ngOnInit() {
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  close() {
    this.dialog.close();
  }
  save(form: NgForm) {
    const sound = <Sound>({
      title: form.controls.title.value,
      soundURL: '',
      orderid:  Math.floor((Math.random() * 1000) + 50)
    });
    this.db.createSound(sound, this.selectedFile);
    this.dialog.close();
  }
}
