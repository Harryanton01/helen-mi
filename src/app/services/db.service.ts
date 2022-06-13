import { Performance } from './../performance';
import { Injectable } from '@angular/core';
import { Video } from '../video';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '../../../node_modules/angularfire2/firestore';
import { Observable, Subject } from '../../../node_modules/rxjs';
import * as firebase from 'firebase/app';
import { Router } from '../../../node_modules/@angular/router';
import { Sound } from '../sound';
import { Image } from '../image';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  image: Observable<any>;
  dbRef: any;
  selectedFiles: FileList;
  uploadedURL: string;
  private itemDoc: AngularFirestoreDocument<Video>;
  private soundDoc: AngularFirestoreDocument<Sound>;
  private imageDoc: AngularFirestoreDocument<Image>;
  private performanceDoc: AngularFirestoreDocument<Performance>;
  public items: Observable<Video[]>;
  public item: Observable<Video>;
  username: string | null;
  itemarray: Video[];

  constructor(private db: AngularFirestore, private router: Router) { }

  createVideo(data: Video, file: File) {
    const key = this.db.createId();
    this.itemDoc = this.db.doc<Video>('homevid/' + key);
    console.log(data);
    if (file === null || data.description === '') {
      return alert('make sure all fields are filled and select an image');
    }
    const storageRef = firebase.storage().ref();
    const path = key;
    const iRef = storageRef.child(path);
    iRef.put(file).then(() => {
      iRef.getDownloadURL().then((snapshot) => {
        data.imgURL = snapshot;
        data.id = key;
        // data.src = data.src.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
        this.itemDoc.set(data);
        this.router.navigate(['/film']);
      });
    });
  }
  createImage(data: Image, file: File) {
    const key = this.db.createId();
    this.imageDoc = this.db.doc<Image>('images/' + key);
    console.log(data);
    if (file === null) {
      return alert('make sure all fields are filled and select an image');
    }
    const storageRef = firebase.storage().ref();
    const path = key;
    const iRef = storageRef.child(path);
    iRef.put(file).then(() => {
      iRef.getDownloadURL().then((snapshot) => {
        data.imgURL = snapshot;
        data.id = key;
        this.imageDoc.set(data);
        this.router.navigate(['/image']);
      });
    });
  }
  createPerformance(data: Performance, file: File, sound: File) {
    const key = this.db.createId();
    this.performanceDoc = this.db.doc<Performance>('performance/' + key);
    console.log(data);
    if (data.title === '') {
      return alert(`please make sure you've entered a valid title`);
    }
    if (file !== null || file !== undefined) {
      const storageRef = firebase.storage().ref();
      const path = key;
      const soundPath = key.concat('sound');
      const iRef = storageRef.child(path);
      iRef.put(file).then(() => {
        if(sound!== null || sound !== undefined){
          const soundRef = storageRef.child(soundPath);
          soundRef.put(sound).then(() => {
            soundRef.getDownloadURL().then((snapshot) =>{
              data.soundURL= snapshot;
              iRef.getDownloadURL().then((snapshot) => {
                data.imgURL = snapshot;
                data.id = key;
                this.performanceDoc.set(data);
              });
            })
          })
        }
        else{
          iRef.getDownloadURL().then((snapshot) => {
            data.imgURL = snapshot;
            data.id = key;
            this.performanceDoc.set(data);
          });
        }
      });
    } else {
      data.id = key;
      this.performanceDoc.set(data);
    }
  }
  createSound(data: Sound, file: File) {
    const key = this.db.createId();
    this.soundDoc = this.db.doc<Sound>('sound/' + key);
    console.log(data);
    if (file === null || data.title === '') {
      return alert('make sure all fields are filled and select a sound file');
    }
    const storageRef = firebase.storage().ref();
    const path = key;
    const iRef = storageRef.child(path);
    iRef.put(file).then(() => {
      iRef.getDownloadURL().then((snapshot) => {
        data.soundURL = snapshot;
        data.id = key;
        this.soundDoc.set(data);
        this.router.navigate(['/film']);
      });
    });
  }
  delete(id: string) {
    const storageRef = firebase.storage().ref();
    const iRef = storageRef.child(id);
    iRef.delete().then(() => {
      alert('deleted!');
    });
  }
  uploadFile(file: File) {
    const key = 'eventspage';
    const storageRef = firebase.storage().ref();
    const path = key;
    const iRef = storageRef.child(path);
    iRef.put(file).then(() => {
      iRef.getDownloadURL().then((snapshot) => {
        const newfile: any = {
          URL: snapshot
        };
        this.db.doc('item/' + key).set(newfile);
        this.router.navigate(['/about']);
      });
    });
  }
}
