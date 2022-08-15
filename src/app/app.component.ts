import { Component, OnInit } from '@angular/core';
import { LoadService } from './load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private loadServ: LoadService) {}
  title = 'angular-full-course';

  allData = [];
  target = 'https://www.codewars.com/api/v1/users/';
  endTarget = '/code-challenges/completed?page=';
  name = '';
  page = 0;
  allPages = 0;
  done = false;
  isLoading = false;
  errorData = {
    flag: false,
    message: null,
  };
  changingName = false;
  user = null;

  ngOnInit() {}

  getData(name, num) {
    if (name.length < 1) {
      this.allData = [];
      this.errorData.flag = true;
      this.errorData.message = 'Type username first';
      return;
    }
    this.isLoading = true;
    this.changingName = false;
    if ((num > 0 && this.page < this.allPages) || (num < 0 && this.page > 0))
      this.page += num;

    this.loadServ.getData(this.name, this.page).subscribe(
      (val) => {
        this.errorData.flag = false;
        this.allPages = val.totalPages - 1;
        this.allData = [];
        console.log(val.data);
        this.allData.push(...val.data);
        this.isLoading = false;
      },
      (error) => {
        this.allData = [];
        this.user = null;
        this.errorData.flag = true;
        this.errorData.message = this.name + ' not found';
        this.isLoading = false;
      }
    );
  }

  originalOrder(a, b) {
    return 0;
  }

  changeName() {
    console.log(this.name);
    this.changingName = true;
    this.page = 0;
    this.allPages = 0;
  }

  getUserInf(name) {
    this.loadServ.getUser(name).subscribe((val) => {
      this.user = val;
      console.log(this.user);
    });

    this.getData(name, 0);
  }
}
