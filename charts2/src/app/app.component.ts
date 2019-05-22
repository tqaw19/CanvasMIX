import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Data } from './models/Data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CanvasMix';
  data: Data[];
  url = 'https://canvas-api-wquesada.c9users.io/api/courses/3430/enrollments';
  month = [];
  price = [];
  chart = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      res.forEach(y => {
        this.month.push(y.user.name);
        this.price.push(y.grades.current_score);
      });
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              borderColor: 'rgb(34, 104, 244)',
              backgroundColor: 'rgb(84, 141, 255)',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 10,
              minBarLength: 5,
              gridLines: {
                  offsetGridLines: true,
                  color: "rgba(0, 0, 0, 0)",
              }
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}