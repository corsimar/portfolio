import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() index: any;

  constructor() {}

  ngOnInit(): void {}

  projects = [
    'Card Game',
    'Painter',
    'Localizare Punct Poligon Convex',
    'Localizare Punct in PSLG',
    'Snake Game',
    'Tic Tac Toe',
    'Event Management',
    'Puncte intr-un dreptunghi',
    'Punct in poligon simplu',
  ];

  languages = [
    'Java',
    'Java',
    'Java',
    'Java',
    'Java',
    'Java',
    'Java',
    'Java',
    'Java',
  ];

  images = [
    'assets/JocDeCarti.png',
    'assets/Painter.png',
    'assets/PoligonConvex.png',
    'assets/PSLG.png',
    'assets/SnakeGame.png',
    'assets/TicTacToe.png',
    'assets/eEvent.png',
    'assets/Rectangle.png',
    'assets/PunctPoligonSimplu.png',
  ];

  links = [
    'https://github.com/corsimar/CardGame',
    'https://github.com/corsimar/Painter',
    'https://github.com/corsimar/PunctPoligonConvex',
    'https://github.com/corsimar/PunctPSLG',
    'https://github.com/corsimar/SnakeGame',
    'https://github.com/corsimar/Tic-Tac-Toe',
    'https://github.com/corsimar/eEvent',
    'https://github.com/corsimar/PuncteDreptunghi',
    'https://github.com/corsimar/Punct-interior-exterior-poligon-simplu',
  ];
}
