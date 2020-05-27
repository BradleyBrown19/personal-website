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
  fallEnds: any[] = []
  animationState = false;
  animationWithState;
  animationLI;
  animationR;
  animationE;
  animationG;
  animationLogo;
  @ViewChild('game') game;
  @ViewChild('gameScreen') gameScreen;
  @ViewChild('instructions') instructions;
  goose_h_ratio = (100/screen.height)*100
  goose_w_ratio = (100/screen.width)*100

  ngOnInit() {
    gsap.to("#everything", {duration: 2, y: "-90%"});
    // Get the current page scroll position 
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

  public startGame() {
    this.score = 0
    this.instructions.nativeElement.innerHTML = "Tap geese, don't let them reach right side!"
    gsap.to("#everything", {duration: 3, y: "-300%"});
    gsap.to("#game", {duration: 3, transform: "translate(0%, -0%)"})
    gsap.to("#game", {duration: 3, top: "0%"})
    this.startGameCycle(true)
  }

  startGameCycle(fromBeggining) {
    this.isOver = false
    let time
    if (fromBeggining == true) {
      time = 5000
    } else {
      time = 2000
    }
    setTimeout(() => {
      this.score = 0
        if (this.isOver == false) {
        while (this.gameScreen.nativeElement.firstChild) {
          this.gameScreen.nativeElement.removeChild(this.gameScreen.nativeElement.lastChild);
        }
        this.timer = 0
        this.instructions.nativeElement.innerHTML = ""
        this.timerInterval = setInterval(() => {
          this.timer += 1
        }, 1000)
        this.gooseInterval = setInterval(this.maybeGoose.bind(this), 250);
      }
    }, time)
  }

  maybeGoose() {
    let percentage
    if (this.timer > 120) {
      percentage = 0.9
    } else if (this.timer > 100) {
      percentage = 0.8
    } else if (this.timer > 80) {
      percentage = 0.7
    } else if (this.timer > 60) {
      percentage = 0.6
    } else if (this.timer > 40) {
      percentage = 0.5
    } else if (this.timer > 20) {
      percentage = 0.4
    } else {
      percentage = 0.3
    }

    if (Math.random() < percentage) {
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
    gsap.to("#everything", {duration: 2, y: "-90%"});
    gsap.to("#game", {duration: 3, y: "-150%"})
  }

  removeGoose(click) {
    if (this.isOver == false) {
      this.score += 1
      let goose = document.elementFromPoint(click.x, click.y)
      gsap.killTweensOf(goose)
      let self = this;
      let fallEnd = gsap.to(goose, {duration: 3, y: 1*screen.height})

      this.fallEnds.push(goose);

      fallEnd.eventCallback('onComplete', () => {
        this.renderer.removeChild(this.gameScreen.nativeElement,this.fallEnds[0])
        this.fallEnds.shift()
      })

      gsap.to(goose, {rotation: -90, duration: 1})
      
      console.log(goose)
    }
    //goose.remove()
  }

  gameOver() {
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
    if (this.timer > 100) {
      duration = this.randomNumber(2,3)
    } else if (this.timer > 80) {
      duration = this.randomNumber(3,5)
    } else if (this.timer > 60) {
      duration = this.randomNumber(4,6)
    } else if (this.timer > 40) {
      duration = this.randomNumber(5,6)
    } else if (this.timer > 20) {
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
    if (this.isOver) {
      this.score = "Restarting..."
    }
    this.isOver = true
    this.stopAllAnimations()
    clearInterval(this.timerInterval)
    clearInterval(this.gooseInterval)
    this.startGameCycle(false)
  }


  public addGooseToGame() {
    var elem = this.createGoose()
    this.renderer.appendChild(this.gameScreen.nativeElement,elem);
  }

  animate(element) {
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
