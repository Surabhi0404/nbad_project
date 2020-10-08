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

  constructor(private http: HttpClient, private budgetData: DataService) {   }

  ngAfterViewInit() {
    this.budgetData.getData().subscribe(data =>{
      for (var i = 0 ; i < data.myBudget.length; i++) {
            this.dataSource.datasets[0].data[i] = data.myBudget[i].budget;
             this.dataSource.labels[i] = data.myBudget[i].title;
             this.data[i] = data.myBudget[i].budget;
             this.labelText[i] = data.myBudget[i].title;
    }
    this.createChart();
    this.getD3Chart();
  });
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart (ctx, {
        type: 'pie',
        data: this.dataSource
    });
    debugger;
  }

  getD3Chart(){
        var svg = d3.select('svg'),
        width = svg.attr('width'),
        height = svg.attr('height'),
        radius = Math.min(width, height) / 2,
        g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#A3E4D7', '#F1C40F', '#1B4F72']);

        // Generate the pie
        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);

        //Generate groups
        var arcs = g.selectAll('arc')
                    .data(pie(this.data))
                    .enter()
                    .append('g')
                    .attr('class', 'arc')


        //Draw arc paths
        arcs.append('path')
            .attr('fill', function(d, i) {
                return color(i);
            })
            .attr('d', arc);

        const legendG = svg.selectAll('.legend') //
            .data(pie(this.data))
            .enter().append('g')
            .attr('transform', function(d, i){
                return 'translate(' + (width - 70) + ',' + (i * 15 + 20) + ')'; // place each legend on the right and bump each one down 15 pixels
            })
            .attr('class', 'legend');

        legendG.append('rect') // make a matching color rect
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', function(d, i) {
                return color(i);
            });

        legendG.append('text') // add the text
            .text('transform', function(d, i){
                return this.labelText[i];
            })
            .style('font-size', 12)
            .attr('y', 10)
            .attr('x', 11);

      }
}
