import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, shakeAnimation, swingAnimation, flipAnimation, wobbleAnimation, jelloAnimation, rotateAnimation } from 'angular-animations';
import './app.component.scss'
import { gsap } from 'gsap'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 4000, delay: 500, translate: '600px' }),
    shakeAnimation(),
    swingAnimation(),
    flipAnimation(),
    wobbleAnimation(),
    jelloAnimation(),
    rotateAnimation()
  ],
})
export class AppComponent implements OnInit {
  title = 'personal-website';
  animationState = false;
  animationWithState;
  animationLI;
  animationR;
  animationE;
  animationG;
  animationLogo;

  ngOnInit() {
    gsap.to("#everything", {duration: 1, y: "-90%"});
  }

  public startGame() {
    console.log("starting game")
    gsap.to("#everything", {duration: 1, y: "-300%"});
    gsap.to("#game", {duration: 1, transform: "translate(0%, -120%)"})
    gsap.to("#game", {duration: 1, top: "0%"})
  }

  public endGame() {
    console.log("ending game")
    gsap.to("#everything", {duration: 1, y: "-90%"});
    gsap.to("#game", {duration: 1, y: "500%"})
  }

  public restartGame() {

  }

  animate(element) {
    console.log('ANIMATE')
    if (element == 'li') {
      this.animationLI = false;
      setTimeout(() => {
        this.animationLI = true;
      }, 10);
    } else if (element == 'resume') {
      this.animationR = false;
      setTimeout(() => {
        this.animationR = true;
      }, 10);
    } else if (element == 'email') {
      this.animationE = false;
      setTimeout(() => {
        this.animationE = true;
      }, 10);
    } else if (element == 'git') {
      this.animationG = false;
      setTimeout(() => {
        this.animationG = true;
      }, 10);
    } else if (element == 'logo') {
      this.animationLogo = false;
      setTimeout(() => {
        this.animationLogo = true;
      }, 60);
    }

  }

}
