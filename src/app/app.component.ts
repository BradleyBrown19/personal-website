import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, shakeAnimation, swingAnimation, flipAnimation, wobbleAnimation, jelloAnimation, rotateAnimation } from 'angular-animations';
import './app.component.scss'
import { gsap, random } from 'gsap'
import { all } from 'q';
import { animationFrameScheduler } from 'rxjs';

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

  constructor(private renderer:Renderer2) { }
  title = 'personal-website';
  score: any
  gooseInterval: any
  isOver: boolean
  timer: any
  timerInterval: any
  animations: any[] = []
  animationState = false;
  animationWithState;
  animationLI;
  animationR;
  animationE;
  animationG;
  animationLogo;
  @ViewChild('gameScreen') gameScreen;
  goose_h_ratio = (100/screen.height)*100
  goose_w_ratio = (100/screen.width)*100

  ngOnInit() {
    gsap.to("#everything", {duration: 1, y: "-90%"});
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

  public startGame() {
    console.log("starting game")
    this.score = 0
    gsap.to("#everything", {duration: 1, y: "-300%"});
    gsap.to("#game", {duration: 1, transform: "translate(0%, -0%)"})
    gsap.to("#game", {duration: 1, top: "0%"})
    this.startGameCycle()
  }

  startGameCycle() {
    this.isOver = false
    setTimeout(() => {
        if (this.isOver == false) {
        while (this.gameScreen.nativeElement.firstChild) {
          this.gameScreen.nativeElement.removeChild(this.gameScreen.nativeElement.lastChild);
        }
        this.timer = 0
        this.timerInterval = setInterval(() => {
          this.timer += 1
        }, 1000)
        this.gooseInterval = setInterval(this.maybeGoose.bind(this), 250);
      }
    }, 1500)
  }

  maybeGoose() {
    let percentage
    if (this.timer > 300) {
      percentage = 0.9
    } else if (this.timer > 200) {
      percentage = 0.8
    } else if (this.timer > 150) {
      percentage = 0.7
    } else if (this.timer > 125) {
      percentage = 0.6
    } else if (this.timer > 75) {
      percentage = 0.5
    } else if (this.timer > 50) {
      percentage = 0.4
    } else {
      percentage = 0.3
    }

    console.log(percentage)
    console.log(Math.random())
    if (Math.random() < percentage) {
      console.log("MAKING GOOSOE")
      this.addGooseToGame()
    }
  }

  public endGame() {
    this.score = 0
    this.isOver = true
    this.stopAllAnimations()
    clearInterval(this.timerInterval)
    clearInterval(this.gooseInterval)
    while (this.gameScreen.nativeElement.firstChild) {
      this.gameScreen.nativeElement.removeChild(this.gameScreen.nativeElement.lastChild);
    }
    gsap.to("#everything", {duration: 1, y: "-90%"});
    gsap.to("#game", {duration: 1, y: "500%"})
  }

  removeGoose(click) {
    console.log("GOOSE CLICKED")
    if (this.isOver == false) {
      this.score += 1
      let goose = document.elementFromPoint(click.x, click.y)
      gsap.killTweensOf(goose)
      gsap.to(goose, {duration: 3.5, y: 1.5*screen.height})
      gsap.to(goose, {rotation: -90, duration: 1})
      console.log(goose)
    }
    //goose.remove()
  }

  gameOver() {
    console.log("GAME OVER")
    this.score = "GAME OVER"
    this.isOver = true
    clearInterval(this.timerInterval)
    clearInterval(this.gooseInterval)
    this.stopAllAnimations()
  }

  createGoose() {
    var elem = document.createElement('img');

    elem.src = "../assets/goose"+this.randomNumber(1,7).toString() + ".png";
    elem.style.width = "150px";

    elem.onclick = this.removeGoose.bind(this)

    elem.style.position = "absolute";
    elem.style.bottom = "0";
    elem.style.margin = "0";
    elem.style.top = this.randomNumber(0, 100-this.goose_h_ratio).toString() + "%"
    let duration
    if (this.timer > 300) {
      duration = this.randomNumber(2,3)
    } else if (this.timer > 200) {
      duration = this.randomNumber(3,5)
    } else if (this.timer > 200) {
      duration = this.randomNumber(4,6)
    } else if (this.timer > 150) {
      duration = this.randomNumber(5,6)
    } else if (this.timer > 100) {
      duration = this.randomNumber(5,9)
    } else {
      duration = this.randomNumber(6,10)
    }
    duration = (duration / 1400)*window.innerWidth
    let gooseMove = gsap.to(elem, {duration: duration, x: window.innerWidth})
    this.animations.push(gooseMove)
    let self = this
    gooseMove.eventCallback('onComplete', () => {
      self.gameOver()
    })
    return elem
  }

  stopAllAnimations() {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].kill()
    }

    this.animations = []
  }

  public restartGame() {
    this.score = 0
    this.isOver = true
    this.stopAllAnimations()
    clearInterval(this.timerInterval)
    clearInterval(this.gooseInterval)
    this.startGameCycle()
  }


  public addGooseToGame() {
    var elem = this.createGoose()
    this.renderer.appendChild(this.gameScreen.nativeElement,elem);
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
