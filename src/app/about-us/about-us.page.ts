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
      name: 'Joshua D. Maducdoc',
      course: 'BSIT',
      image: '/assets/pug.webp', 
      description: 'Future Game Developer.'
    },
    {
      name: 'Lance Saldy Ocampo',
      course: 'BSIT',
      image: '/assets/punk.webp', // Placeholder
      description: 'future UI/UX designer.'
    },
    {
      name: 'Vincent Bulaclac',
      course: 'BSIT',
      image: '/assets/dog.webp', // Placeholder
      description: 'Future Web Developer.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}