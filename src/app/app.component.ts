import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, shakeAnimation, swingAnimation, flipAnimation, wobbleAnimation, jelloAnimation, rotateAnimation } from 'angular-animations';

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
export class AppComponent {
  title = 'personal-website';
  animationState = false;
  animationWithState;
  animationLI;
  animationR;
  animationE;
  animationG;
  animationLogo;


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
