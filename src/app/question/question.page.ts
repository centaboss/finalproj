import { Component, OnInit, OnDestroy } from '@angular/core'; // Added OnDestroy
import { ActivatedRoute, Router } from '@angular/router';
import { QUESTIONS, Question } from '../questions';
import { GlobalData } from '../services/global-data';
import { ToastController } from '@ionic/angular';
import { CommonModule, DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, DecimalPipe,
    NgSwitch, NgSwitchCase, NgSwitchDefault,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonList, IonItem, IonLabel
  ]
})
export class QuestionPage implements OnInit, OnDestroy { // Added OnDestroy here
  categoryName = '';
  questions: Question[] = [];
  currentQuestion: Question = { question: 'Loading...', choices: [], answer: 0, category: '' };
  
  currentQuestionIndex = 0;
  totalQuestions = 0;
  
  selectedAnswer: number | null = null;
  selectedAnswers: (number | null)[] = [];
  score = 0;
  
  showResult = false;
  isTimeAttack = false;
  timeLeft = 60;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private global: GlobalData,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // FIX: Changed 'cat' to 'category' to match your app.routes.ts
    this.categoryName = this.route.snapshot.paramMap.get('category') || '';

    // 2. Load Questions
    if (this.categoryName === 'Time Attack') {
      this.isTimeAttack = true;
      // Shuffle and take 10
      this.questions = this.shuffle(QUESTIONS).slice(0, 10);
      this.startTimer();
    } else {
      // Filter by category
      this.questions = QUESTIONS.filter(q => q.category === this.categoryName);
      this.questions = this.shuffle(this.questions);
    }

    this.totalQuestions = this.questions.length;

    // 3. Set First Question
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
    } else {
       // Handle empty category or error
       this.showResult = true;
    }
  }

  // FIX: Added this to stop the timer if user leaves the page early
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timeLeft = 60;
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endQuiz();
      }
    }, 1000);
  }

  selectAnswer(index: number) {
    this.selectedAnswer = index;
  }

  async nextQuestion() {
    if (this.selectedAnswer === null) return;

    // Save answer
    this.selectedAnswers[this.currentQuestionIndex] = this.selectedAnswer;

    // Check correctness
    const isCorrect = this.selectedAnswer === this.currentQuestion.answer;
    if (isCorrect) this.score++;

  const toast = await this.toastCtrl.create({
  message: isCorrect ? 'Correct! 🎉' : 'Incorrect ❌',
  duration: 800,
  color: isCorrect ? 'success' : 'danger',
  position: 'bottom',
  cssClass: 'my-custom-toast', // <--- ADD THIS LINE
});
toast.present();

    setTimeout(() => {
      this.currentQuestionIndex++;
      
      if (this.currentQuestionIndex < this.totalQuestions) {
        this.selectedAnswer = null;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      } else {
        this.endQuiz();
      }
    }, 800);
  }

endQuiz() {
    clearInterval(this.timerInterval);
    this.showResult = true;
    
    // Get the current username to save it permanently with this score
    const currentUser = this.global.getUsername(); 

    this.global.addScore({
      username: currentUser, // <--- ADD THIS (Saves the name!)
      category: this.categoryName,
      score: this.score,
      total: this.totalQuestions,
      date: new Date().toLocaleDateString()
    });
  }

  retryQuiz() {
    // Simple way to restart: reload the current route
    window.location.reload();
  }

  returnCategory() {
    this.router.navigate(['/quiz']);
  }

  getUserAnswer(index: number): string {
    const ansIdx = this.selectedAnswers[index];
    if (ansIdx === null || ansIdx === undefined) return 'No Answer';
    return this.questions[index]?.choices[ansIdx] || 'Unknown'; // Added safety check
  }

  shuffle(array: any[]) {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}