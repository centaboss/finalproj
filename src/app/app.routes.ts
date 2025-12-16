import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // FIX 1: Removed /:categoryID. This page is just the menu of topics.
    path: 'quiz', 
    loadComponent: () => import('./quiz/quiz.page').then((m) => m.QuizPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.page').then((m) => m.AboutUsPage)
  },
  {
    // FIX 2: Added /:category. This tells Angular "expect a category name here"
    path: 'question/:category', 
    loadComponent: () => import('./question/question.page').then((m) => m.QuestionPage)
  },
  {
    path: '**', 
    redirectTo: 'home',
  },
];