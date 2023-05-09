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
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/JocDeCarti.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/Painter.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/PoligonConvex.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/PSLG.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/SnakeGame.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/TicTacToe.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/eEvent.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/Rectangle.png',
    'https://github.com/corsimar/portfolio/tree/main/docs/assets/PunctPoligonSimplu.png',
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
