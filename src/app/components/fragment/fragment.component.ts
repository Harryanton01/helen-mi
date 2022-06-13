import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.css']
})
export class FragmentComponent implements OnInit {
  private imagecollection: AngularFirestoreCollection<any>;
  images: any[];
  private loaded = false;

  constructor(private auth: AuthService, private afs: AngularFirestore, private elementRef: ElementRef) {

    this.imagecollection = afs.collection<any>('fragment', ref => ref.orderBy('orderid'));
    this.imagecollection.valueChanges().subscribe(x => {
      this.images = x;
      console.log(x)
      this.loaded= true;
    });
   }
  
  
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2f3133';
 }

}
