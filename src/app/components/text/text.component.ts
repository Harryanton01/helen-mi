import { Performance } from './../../performance';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DbService } from 'src/app/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService, private db: DbService, private afs: AngularFirestore, private sanitizer: DomSanitizer, private elementRef: ElementRef) { }
  selectedFile: File;
  fileURL: any;
  performances: Performance[];

  ngOnInit() {
    this.afs.doc<any>('item/eventspage').valueChanges().subscribe(x => {
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(x.URL);
    });
  }
  uploadFile(event) {
    this.selectedFile = <File>event.target.files[0];
    this.db.uploadFile(this.selectedFile);
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
 }

}
