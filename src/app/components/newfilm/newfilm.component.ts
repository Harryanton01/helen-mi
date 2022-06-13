import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Video } from '../../video';
import { Sound } from '../../sound';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { DbService } from '../../services/db.service';
import { UploadSoundComponent } from '../upload-sound/upload-sound.component';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-newfilm',
  templateUrl: './newfilm.component.html',
  styleUrls: ['./newfilm.component.css']
})
export class NewfilmComponent implements OnInit, AfterViewInit {

  private imagecollection: AngularFirestoreCollection<Video>;
  private soundcollection: AngularFirestoreCollection<Sound>;
  selectedVideo: Video;
  images: Video[];
  sounds: Sound[];

  constructor(private auth: AuthService, private dialog: MatDialog, private afs: AngularFirestore, private drag: DragulaService,
    private db: DbService, private elementRef: ElementRef) {
    this.imagecollection = afs.collection<Video>('homevid', ref => ref.orderBy('orderid'));
    this.soundcollection = afs.collection<Sound>('sound', ref => ref.orderBy('orderid'));
    this.imagecollection.valueChanges().subscribe(x => {
      this.images = x;
      console.log(x)
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

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2f3133';
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
  lessThan(numone, numtwo){
    return numone<numtwo;
  }
}
