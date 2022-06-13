import { DbService } from './../../services/db.service';
import { UploadComponent } from './../upload/upload.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '../../../../node_modules/angularfire2/firestore';
import { Video } from '../../video';
import { Observable } from '../../../../node_modules/rxjs';
import { DragulaService } from 'ng2-dragula';
import { UploadSoundComponent } from '../upload-sound/upload-sound.component';
import { Sound } from '../../sound';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private imagecollection: AngularFirestoreCollection<Video>;
  private soundcollection: AngularFirestoreCollection<Sound>;
  selectedVideo: Video;
  images: Video[];
  sounds: Sound[];

  constructor(private auth: AuthService, private dialog: MatDialog, private afs: AngularFirestore, private drag: DragulaService,
    private db: DbService) {
    this.imagecollection = afs.collection<Video>('homevid', ref => ref.orderBy('orderid'));
    this.soundcollection = afs.collection<Sound>('sound', ref => ref.orderBy('orderid'));
    this.imagecollection.valueChanges().subscribe(x => {
      this.images = x;
    });
    this.soundcollection.valueChanges().subscribe(x => {
      this.sounds = x;
      console.log(x);
    });
  }

  ngOnInit() {
    this.drag.drop().subscribe(x => {
      console.log(this.images[0]);
    });
  }

  addImage() {
    this.dialog.closeAll();
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    this.dialog.open(UploadComponent, config);
  }
  addSound() {
    this.dialog.closeAll();
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    this.dialog.open(UploadSoundComponent, config);
  }
  update() {
    for (let index = 0; index < this.images.length; index++) {
      this.images[index].orderid = index;
      this.afs.doc<Video>('homevid/' + this.images[index].id).update(this.images[index]);
    }
    alert('updated!');
  }
  delete(image: Video) {
    if (confirm('Are you sure you want to delete the video?')) {
      this.afs.doc<Video>('homevid/' + image.id).delete();
      this.db.delete(image.id);
    }
  }
  deleteSound(sound: Sound) {
    if (confirm('Are you sure you want to delete the sound file?')) {
      this.afs.doc<Sound>('sound/' + sound.id).delete();
      this.db.delete(sound.id);
    }
  }
}
