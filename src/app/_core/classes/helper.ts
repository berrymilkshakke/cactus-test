import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {TimeSpan} from '../interfaces/time-span';


export class Helper {

  static dateToString(date: NgbDate) {
    return `${date.year}-${date.month}-${date.day}`;
  }

  static getRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static parseFloat(n: number) {
    // tslint:disable-next-line:radix
    return parseInt(String(n * 10)) / 10;
  }

  static stringToJSON(s: string) {
    return JSON.parse(s);
  }

  static getElapsedTime(totalSeconds: number): TimeSpan {

    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 86400) {
      days = Math.floor(totalSeconds / 86400);
      totalSeconds -= 86400 * days;
    }

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds -= 3600 * hours;
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  static secondsBeforeEndOfTheDay() {
    const now = new Date();

    const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    return Math.floor((weekEnd.getTime() - now.getTime()) / 1000);
  }

  static secondsBeforeEndOfTheWeek() {
    const now = new Date();

    let dayOfWeek;
    if (now.getDay() === 0) {
      dayOfWeek = 7;
    } else {
      dayOfWeek = now.getDay() + 1;
    }

    const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - dayOfWeek), 23, 59, 59);
    return Math.floor((weekEnd.getTime() - now.getTime()) / 1000);
  }

  static secondsBeforeEndOfTheMonth() {
    const now = new Date();
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return Math.floor((monthEnd.getTime() - now.getTime()) / 1000);
  }
}
