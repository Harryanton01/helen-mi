import { DbService } from 'src/app/services/db.service';
import { Performance } from './../../performance';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, AfterViewInit {

  performancecollection: AngularFirestoreCollection<Performance>;
  selectedEvent: Performance;
  performances: Performance[];
  bool = false;
  private showPlayer: boolean = false; 

  constructor(private afs: AngularFirestore, private auth: AuthService, private dialog: MatDialog, private drag: DragulaService,
    private db: DbService, private elementRef: ElementRef) {
    this.performancecollection = afs.collection<Performance>('performance', ref => ref.orderBy('orderid'));
   }

  ngOnInit() {
    this.performancecollection.valueChanges().subscribe(x => {
      console.log(x);
      this.performances = x;
      this.selectedEvent = x[0];
      this.bool = true;
    });
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
 }
  onSelect(event: any) {
    if (event.title === 'Advice Column') {
      console.log('col');
      this.bool = true;
      this.selectedEvent = event;
    } else {
      this.bool = false;
      this.showPlayer = false;
      this.selectedEvent = event;
      if(this.selectedEvent.soundURL){
        this.showPlayer = false;
        setTimeout(() => this.showPlayer = true, 0);
      }
    }
  }
  
  addEvent() {
    this.dialog.closeAll();
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    this.dialog.open(UploadImageComponent, config);
  }
  mail() {
    window.open('mailto:helenxmichael@gmail.com?subject=Advice Column');
  }
  update() {
    for (let index = 0; index < this.performances.length; index++) {
      this.performances[index].orderid = index;
      this.afs.doc<Performance>('performance/' + this.performances[index].id).update(this.performances[index]);
    }
    alert('updated!');
  }
  delete(image: Performance) {
    if (confirm('Are you sure you want to delete the performance?')) {
      this.afs.doc<Performance>('performance/' + image.id).delete();
      this.db.delete(image.id);
    }
  }
}
