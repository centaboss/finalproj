import { Injectable } from '@angular/core';

export interface ScoreRecord {
  username: string;
  category: string;
  score: number;
  total: number;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalData {
  private _username: string = '';
  private _scoreHistory: { [username: string]: ScoreRecord[] } = {};

 
  setUsername(name: string) {
    this._username = name;
    if (!this._scoreHistory[name]) {
      this._scoreHistory[name] = [];
    }
  }

  getUsername(): string {
    return this._username;
  }

  addScore(record: ScoreRecord) {
    if (!this._username) return;

    if (!this._scoreHistory[this._username]) {
      this._scoreHistory[this._username] = [];
    }
    this._scoreHistory[this._username].unshift(record);
  }

  getScoreHistory(): ScoreRecord[] {
    if (!this._username || !this._scoreHistory[this._username]) {
      return [];
    }
    return this._scoreHistory[this._username];
  }
}