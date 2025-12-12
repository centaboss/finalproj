import { Injectable } from '@angular/core';

export interface ScoreRecord {
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

  // Set username
  setUsername(name: string) {
    this._username = name;
    // Initialize the array if it doesn't exist yet for this user
    if (!this._scoreHistory[name]) {
      this._scoreHistory[name] = [];
    }
  }

  // Get username
  getUsername(): string {
    return this._username;
  }

  // Save score
  addScore(record: ScoreRecord) {
    // Safety check: ensure username is set
    if (!this._username) return;

    if (!this._scoreHistory[this._username]) {
      this._scoreHistory[this._username] = [];
    }
    // Add the new score to the START of the array so newest shows first
    this._scoreHistory[this._username].unshift(record);
  }

  // Get score history
  getScoreHistory(): ScoreRecord[] {
    // If no username is set, or no history exists, return empty array
    if (!this._username || !this._scoreHistory[this._username]) {
      return [];
    }
    return this._scoreHistory[this._username];
  }
}