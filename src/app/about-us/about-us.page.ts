import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar
  ]
})
export class AboutUsPage implements OnInit {

  // Data for the 3 team members
  teamMembers = [
    {
      name: 'Member Name 1',
      role: 'Lead Developer',
      image: 'https://ionicframework.com/docs/img/demos/avatar.svg', // Placeholder
      description: 'Expert in Angular and Ionic framework architecture.'
    },
    {
      name: 'Member Name 2',
      role: 'UI/UX Designer',
      image: 'https://ionicframework.com/docs/img/demos/avatar.svg', // Placeholder
      description: 'Designed the dark mode interface and user experience.'
    },
    {
      name: 'Member Name 3',
      role: 'Backend Engineer',
      image: 'https://ionicframework.com/docs/img/demos/avatar.svg', // Placeholder
      description: 'Manages the quiz logic and data structures.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}