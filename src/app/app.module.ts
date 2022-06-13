import { PerformanceComponent } from './components/performance/performance.component';
import { TextComponent } from './components/text/text.component';
import { IndexComponent } from './components/index/index.component';
import { ImageComponent } from './components/image/image.component';
import { VideoComponent } from './components/video/video.component';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { UploadSoundComponent } from './components/upload-sound/upload-sound.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { NewfilmComponent } from './components/newfilm/newfilm.component';
import { AdviceColumnComponent } from './components/advice-column/advice-column.component';
import { TextPageComponent } from './components/text-page/text-page.component';
import { ArtComponent } from './components/art/art.component';
import { FragmentComponent } from './components/fragment/fragment.component';

const appRoutes: Routes = [
  {path: 'filmlinks', component: HomePageComponent},
  {path: 'art', component: NewfilmComponent},
  {path: 'home', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'fragment', component: FragmentComponent},
  {path: 'image', component: ImageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: TextComponent},
  {path: 'textworks', component: TextPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'advice', component: AdviceColumnComponent},
  {path: 'video/:id', component: VideoComponent},
  {path: '**', component: IndexComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    LoginComponent,
    UploadComponent,
    VideoComponent,
    UploadSoundComponent,
    ImageComponent,
    UploadImageComponent,
    IndexComponent,
    TextComponent,
    PerformanceComponent,
    NewfilmComponent,
    AdviceColumnComponent,
    TextPageComponent,
    ArtComponent,
    FragmentComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    DragulaModule.forRoot()
  ],
  providers: [AuthService, DbService],
  bootstrap: [AppComponent],
  entryComponents: [UploadComponent, UploadSoundComponent, UploadImageComponent]
})
export class AppModule { }
