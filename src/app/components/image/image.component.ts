import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Video } from '../../video';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { UploadComponent } from '../upload/upload.component';
import { UploadSoundComponent } from '../upload-sound/upload-sound.component';
import { Image } from '../../image';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  private imagecollection: AngularFirestoreCollection<Image>;
  selectedVideo: Image;
  images: Image[];

  constructor(private auth: AuthService, private dialog: MatDialog, private afs: AngularFirestore, private drag: DragulaService) {
    this.imagecollection = afs.collection<Image>('images', ref => ref.orderBy('orderid'));
    this.imagecollection.valueChanges().subscribe(x => {
     this.images = x;
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
    this.dialog.open(UploadImageComponent, config);
  }
  update() {
    for (let index = 0; index < this.images.length; index++) {
      this.images[index].orderid = index;
      this.afs.doc<Image>('images/' + this.images[index].id).update(this.images[index]);
    }
    alert('updated!');
  }
  delete(image: Video) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.afs.doc<Video>('images/' + image.id).delete();
    }
  }
}
