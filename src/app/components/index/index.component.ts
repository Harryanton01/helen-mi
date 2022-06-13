import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  private imagecollection: AngularFirestoreCollection<any>;
  images: any[];
  constructor(private afs: AngularFirestore) { 
    this.imagecollection = afs.collection<any>('fragment', ref => ref.orderBy('orderid'));
    this.imagecollection.valueChanges().subscribe(x => {
      this.images = x;
      console.log(x)
    });

  }

  ngOnInit() {
  }

}
