import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-kata',
  templateUrl: './kata.component.html',
  styleUrls: ['./kata.component.css'],
})
export class KataComponent implements OnInit {
  constructor() {}
  @Input() kata;
  @Input() i;

  link: string;
  ngOnInit(): void {
    this.link = 'https://www.codewars.com/kata/' + this.kata.id;
  }
}
