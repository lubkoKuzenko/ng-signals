import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { AbstractComponent } from '../../abstractions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent extends AbstractComponent {
  public Highcharts: typeof Highcharts = Highcharts;
  public updateFromInput = false;
  public showChart = true;
  public toggleButtonTitle = 'Destroy chart';

  public optFromInputString = `
    {
      "title": { "text": "Highcharts chart" },
      "series": [{
        "data": [11,2,3],
        "zones": [{
          "value": 7.2,
          "dashStyle": "dot",
          "color": "red"
        }]
      }, {
        "data": [5,6,7]
      }]
    }
  `;
  public optFromInput: Highcharts.Options = JSON.parse(this.optFromInputString);

  public ngOnInit() {
    console.log(this.router, this.activatedRoute);
    this._loading$.next(true);

    setTimeout(() => {
      this._loading$.next(false);
    }, 1000);
  }

  // Demonstrate chart instance
  public logChartInstance(chart: Highcharts.Chart) {
    if (chart) {
      console.log('Chart instance received:', chart);
    } else {
      console.log('Chart instance destroyed');
    }
  }

  public updateInputChart() {
    this.optFromInput = JSON.parse(this.optFromInputString);
  }
}
