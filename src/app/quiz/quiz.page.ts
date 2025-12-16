import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalData } from '../services/global-data';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
  IonButtons, IonMenuButton, IonBackButton, IonGrid, IonRow, IonCol,
  IonMenu, IonList, IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonButtons, IonMenuButton, IonBackButton, IonGrid, IonRow, IonCol,
    IonMenu, IonList, IonItem
  ],
})
export class QuizPage implements OnInit {
  username = '';
  categories = ['IT-IPT01', 'IT-IPT02', 'IT-IAS01', 'IT-SA01', 'IT-IMO1'];

  constructor(private global: GlobalData, private router: Router) {}

  ngOnInit() {
    this.username = this.global.getUsername();
  }

  // Helper for colors (Switch statement logic can go here or in HTML)
  getCategoryColor(cat: string): string {
    if (cat === 'IT-IMO1') return 'primary';
    if (cat === 'IT-IPT02') return 'tertiary';
    if (cat === 'IT-SA01') return 'dark';
    return 'secondary';
  }

  goToQuestion(category: string) {
    // Navigate to the Question Page and pass the category
    this.router.navigate(['/question', category]);
  }
}