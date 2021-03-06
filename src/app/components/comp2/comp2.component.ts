import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { IMqttMessage, MqttService } from "ngx-mqtt";

@Component({
  selector: "app-comp2",
  templateUrl: "./comp2.component.html",
  styleUrls: ["./comp2.component.scss"],
})
export class Comp2Component implements OnInit {
  @ViewChild("accCanvas", { static: false }) accCanvas: ElementRef;
  @ViewChild("stepCountCanvas", { static: false }) stepCountCanvas: ElementRef;

  accChart: Chart;
  stepCountChart: Chart;

  public message: string;

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe("fever").subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
    });

    setInterval(() => {
      console.log("timer");

      let random = Math.floor(Math.random() * 101);
      this.addData(this.stepCountChart, [random]);
      this.addData(this.accChart, [random, random + 15, random + 31]);
    }, 3000);
  }

  addData = (chart, data) => {
    let dateNow = new Date();

    let label =
      dateNow.getHours() +
      ":" +
      dateNow.getMinutes() +
      ":" +
      dateNow.getSeconds();

    chart.data.labels.push(label);
    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
    }
    let i = 0;
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data[i]);
      i += 1;
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
    });
    chart.update();
  };

  drawAccelerometer = () => {
    return new Chart(this.accCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [
          "1:00PM",
          "1:10PM",
          "1:20PM",
          "1:30PM",
          "1:40PM",
          "1:50PM",
          "2:00PM",
        ],
        datasets: [
          {
            label: "X",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [45, 39, 50, 71, 53, 35, 48],
            spanGaps: false,
          },
          {
            label: "Y",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,99,132,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          },
          {
            label: "Z",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(153, 102, 255, 0.4)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(153, 102, 255, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(153, 102, 255, 1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 29, 84, 21, 46, 57, 20],
            spanGaps: false,
          },
        ],
      },
    });
  };

  drawStepCountChart = () => {
    return new Chart(this.stepCountCanvas.nativeElement, {
      type: "line",
      data: {
        labels: [
          "1:00PM",
          "1:10PM",
          "1:20PM",
          "1:30PM",
          "1:40PM",
          "1:50PM",
          "2:00PM",
        ],
        datasets: [
          {
            label: "Steps",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          },
        ],
      },
    });
  };

  ngOnInit() {
    console.log("ionViewDidEnter");

    setTimeout(() => {
      console.log("calling");
      this.accChart = this.drawAccelerometer();
      this.stepCountChart = this.drawStepCountChart();
    }, 3000);
  }
}
