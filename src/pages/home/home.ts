import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myGuessInput: string;
  numberOfGuesses: number = 0;
  min: number;
  max: number;
  _randomNumber: number;


  constructor(private alertCtrl: AlertController) {
    this.min = 1;
    this.max = 10;
    this._randomNumber = this._generateRandomNumber();
    console.log(`The number is ${this._randomNumber}`);
  }

  win(){
    this.presentAlert('user');    
    this.resetGame();
  }

  loose(){
    this.presentAlert('computer');
  }

  guessNumber() {
    this.incrementGuesses();
    if(Number(this.myGuessInput) == this._randomNumber){
      this.win();
    }else{
      this.loose();
    }
  }

  incrementGuesses() {
    this.numberOfGuesses++;
    console.log(this.numberOfGuesses);
  }

  _generateRandomNumber() {
    return Math.floor(Math.random() * (this.max - this.min)) + this.min;
  }

  resetGame() {
    this._randomNumber = this._generateRandomNumber();
    this.numberOfGuesses = 0;
    this.myGuessInput = '';
  }

  presentAlert(winner:string) {
    let title:string;
    let subTitle:string;
    let buttons:Array<string>;

    if(winner=='user'){
      title = "You Won!";
      subTitle = `It took you ${this.numberOfGuesses} guesses to win! Click Restart to restart the game`;
      buttons = ['Restart'];
    }else{
      title = "You Lost!";
      subTitle = `Click Guess Again to try again`;
      buttons = ['Guess Again'];
    }

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

}
