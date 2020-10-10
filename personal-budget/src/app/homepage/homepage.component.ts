import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#9A7D0A',
                        '#27AE60',
                        '#D0D3D4',
                        '#34495E'
            ],
        }
    ],
    labels: []
};

public data = [];
public labelText = [];
private svg;
  private margin = 50;
  private width = 500;
  private height = 800;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private http: HttpClient, private budgetData: DataService) {   }

  ngAfterViewInit() {
    this.budgetData.getData().subscribe(data =>{
      this.data = data.myBudget;
      for (var i = 0 ; i < data.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = data.myBudget[i].budget;
             this.dataSource.labels[i] = data.myBudget[i].title;
    }
    this.createChart();
    this.createSvg();
    this.createColors();
    this.drawChart();

  });
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart (ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}
private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.budget.toString()))
  .range(["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19", "#9A7D0A", "#27AE60", "#D0D3D4", "#34495E" ]);
}
private drawChart(): void {
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d, i) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text(d => d.data.title)
  .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}

}
