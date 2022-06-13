import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, Input, Pipe, PipeTransform, AfterViewInit, ElementRef } from '@angular/core';
import { Video } from '../../video';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {
  @Input() video: Video;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, private sanitizer: DomSanitizer, private elementRef: ElementRef) { }
  private URL;
  private vid = false;
  private audio = false;
  private firstimage;
  private secondimage;
  private imgtext;
  private videotext;
  private soundURL;
  private advice = false;
  private whatsapp = false;
  private cactus = false;
  private manifest = false;
  private spacebat = false;
  private love = false;
  private think = false;
  private vidtext = false;
  private standstill = false;
  ngOnInit() {
    const videoID = this.route.snapshot.paramMap.get('id');
    this.afs.collection('homevid').doc<Video>(videoID).valueChanges().subscribe(x => {
      this.video = x;
      if(x.src){
        this.vid = true;
        this.URL = this.sanitizer.bypassSecurityTrustResourceUrl(x.src);
      }
      if(x.id==="Tldb9sUlajggszks5Lqh")this.advice=true;
      if(x.id==="jSBYg3PnGqtDtv84Y5CJ")this.manifest=true;
      if(x.id==="YLFUuPAiOSMh5PKwZimN")this.spacebat=true;
      if(x.id==="6TmNclaoBhAwEQkkyWio")this.cactus=true;
      if(x.id==="zwghT6f4ScznAuFuHYtd")this.whatsapp= true;
      if(x.id==="JwpVbaIfmSj1O2kLp5FL")this.think = true;
      if(x.id==="RVUriEQV7SfRsvqElmIJ" || x.id==="jSB6MRAQPiPL97qMxleY")this.audio=true;
      
      if(x.vidtext)this.vidtext=true;
      this.videotext = x.vidtext;
      this.firstimage=x.img1;
      this.secondimage=x.img2;
      this.imgtext = x.imgtext;
      this.soundURL = x.soundURL;
      console.log(x)
    });
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
 }
}
