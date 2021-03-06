import { Component, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

import { IMqttMessage, MqttService } from "ngx-mqtt";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild("bodyTempCanvas", { static: false }) bodyTempCanvas: ElementRef;
  @ViewChild("surrTempCanvas", { static: false }) surrTempCanvas: ElementRef;
  @ViewChild("humidityCanvas", { static: false }) humidityCanvas: ElementRef;
  @ViewChild("thiCanvas", { static: false }) thiCanvas: ElementRef;
  @ViewChild("heartCanvas", { static: false }) heartCanvas: ElementRef;

  bodyTempChart: Chart;
  surrTempChart: Chart;
  humidityChart: Chart;
  thiChart: Chart;
  heartChart: Chart;

  lat = 11.332;
  lng = 1.333;

  public message: string;

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe("BodyTemp").subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
    });
    this._mqttService.observe("page1").subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
    });
    this._mqttService
      .observe("HeartBeat")
      .subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        console.log(this.message);
      });

    setInterval(() => {
      console.log("timer");

      let random = Math.floor(Math.random() * 101);
      this.addData(this.bodyTempChart, random);
      this.addData(this.surrTempChart, random);
      this.addData(this.humidityChart, random);
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
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
    });
    chart.update();
  };

  ionViewDidEnter() {
    this.bodyTempChart = new Chart(this.bodyTempCanvas.nativeElement, {
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
            label: "Temperature",
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

    this.surrTempChart = new Chart(this.surrTempCanvas.nativeElement, {
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
            label: "Temperature",
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
        ],
      },
    });

    this.humidityChart = new Chart(this.humidityCanvas.nativeElement, {
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
            label: "Humidity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "255, 206, 86, 0.4)",
            borderColor: "255, 206, 86, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "255, 206, 86, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "255, 206, 86, 1)",
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

    this.thiChart = new Chart(this.thiCanvas.nativeElement, {
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
            label: "THI",
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
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          },
        ],
      },
    });

    this.heartChart = new Chart(this.heartCanvas.nativeElement, {
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
            label: "Heart Beat",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 159, 64, 0.4)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255, 159, 64, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 159, 64, 1)",
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
  }
}
