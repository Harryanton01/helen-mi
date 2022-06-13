import { DbService } from './../../services/db.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Video } from '../../video';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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
  checkURL(url: string){
    const vimeoURL = "vimeo.com/";
    if(!url.includes('video')){
      return url.replace(vimeoURL, 'player.vimeo.com/video/')
    }
    else {
      return url;
    }
  }
  save(form: NgForm) {
    const video = <Video>({
      id: '',
      imgURL: '',
      src: this.checkURL(form.controls.url.value),
      duration: form.controls.duration.value,
      description: form.controls.description.value,
      orderid:  Math.floor((Math.random() * 1000) + 50)
    });
    this.db.createVideo(video, this.selectedFile);
    this.dialog.close();
  }
}
