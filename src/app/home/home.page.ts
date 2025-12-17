/*  home.page.ts  */
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalData } from '../services/global-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, ViewWillEnter } from '@ionic/angular'; // Import ViewWillEnter


import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonFooter,
  IonMenu,
  IonList,
  IonMenuButton,
  IonButtons,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    IonFooter,
    IonMenu,
    IonList,
    IonMenuButton,
    IonButtons,
    IonLabel,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class HomePage implements ViewWillEnter { // Implement the interface
  username: string = '';
  scoreHistory: any[] = [];

  constructor(
    private global: GlobalData,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  // FIXED: This runs every time you enter the page (including back navigation)
  ionViewWillEnter() {
    this.username = this.global.getUsername();
    this.scoreHistory = this.global.getScoreHistory();
    console.log('Scores refreshed:', this.scoreHistory); // Debugging log
  }

async startQuiz() {
    if (!this.username.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'Please enter your name!',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
      return;
    }

    // Set the username in the global service
    this.global.setUsername(this.username);
    
    // FIX: Navigate to the Quiz Menu (no ID needed here yet)
    this.router.navigate(['/quiz']); 
  }
}