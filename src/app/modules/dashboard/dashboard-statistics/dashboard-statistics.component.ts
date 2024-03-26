import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardFacade } from '../services/dashboard-facade.service';
import {
  IDashboard,
  IPassagePerDate,
  IPassagePerRange,
  IRangeData,
} from '../../../core/models/typings.model';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.scss'],
})
export class DashboardStatisticsComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public statisticsPerDay!: any[];
  @ViewChild('doughnut', { static: true }) doughnut!: ElementRef;
  @ViewChild('line', { static: true }) line!: ElementRef;
  public doughnutChart!: any;
  public lineChart!: any;
  public dashboardData!: IDashboard;
  public backgroundColor: string[] = [];
  public rangeData: IRangeData[] = [];
  public totalHoveredPassageRange!: string;
  public totalHoveredPassageDate!: string;
  public isDashboardLoading$ = this.dashboardFacade.isDashboardLoading$;
  public totalStatus$ = this.dashboardFacade.totalStatus$;
  date: any[] | undefined;
  public client$ = this.dashboardFacade.client$.pipe(
    map((client) => {
      const index = client.indexOf(' ', client.indexOf(' ') + 1);
      if (index !== -1) {
        const extractedString = client.substring(0, index);
        return extractedString;
      } else {
        return client;
      }
    })
  );

  constructor(
    private dashboardFacade: DashboardFacade,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.dashboardFacade.loadDashboardData('t');
    this.dashboardFacade.dashboardPage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dashboardData = data;
        this.renderCharts();
        this.verifyIfRangeExists();
      });
    this.statisticsPerDay = [
      { name: "Aujourd'hui" },
      { name: 'La semaine précédente' },
      { name: 'Le mois précédent' },
    ];
    this.dashboardFacade.loadDashboardNotifications();

  }
  public renderCharts() {
    if (this.doughnutChart) this.doughnutChart.destroy();
    if (this.lineChart) this.lineChart.destroy();
    this.dashboardData.passagePerRange
      .map((range) => range.diffusion_range)
      .map((range) => {
        if (range === '08-10') {
          this.backgroundColor.push('rgba(16, 118, 252, 1)');
        }
        if (range === '10-12') {
          this.backgroundColor.push('rgba(27, 43, 177, 1)');
        }
        if (range === '12-14') {
          this.backgroundColor.push('rgba(241, 173, 35, 1)');
        }
        if (range === '14-16') {
          this.backgroundColor.push('rgba(251, 75, 78, 1)');
        }
        if (range === '16-18') {
          this.backgroundColor.push('rgba(22, 224, 189, 1)');
        }
        if (range === '18-20') {
          this.backgroundColor.push('rgba(94, 235, 251, 1');
        }
      });
    this.doughnutChart = new Chart(this.doughnut.nativeElement, {
      type: 'doughnut',

      data: {
        labels: this.dashboardData.passagePerRange.map(
          (passage: IPassagePerRange) => passage.diffusion_range
        ),
        datasets: [
          {
            data: this.dashboardData.passagePerRange.map(
              (passage: IPassagePerRange) => parseInt(passage.total)
            ),
            backgroundColor: this.backgroundColor,
            borderWidth: 0,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'left',
            align: 'center',
            textDirection: 'center',

            display: false,
            labels: {
              boxWidth: 15,
              boxHeight: 15,
              color: '#0A113D',
              font: {
                size: 16,
              },
              textAlign: 'center',
            },
          },
        },
        onHover: (event, elements) => {
          const element = elements[0];
          if (element) {
            const index = element.index;
            this.totalHoveredPassageRange =
              this.dashboardData.passagePerRange[index].total;
          }
          this.changeDetectorRef.detectChanges();
        },
      },
    });

    this.lineChart = new Chart(this.line.nativeElement, {
      type: 'line',

      data: {
        labels: this.dashboardData?.passagePerDate.map(
          (passage: IPassagePerDate) =>
            new Date(passage.diffusion_number_date).toLocaleDateString()
        ),
        datasets: [
          {
            label: '',
            data: this.dashboardData?.passagePerDate.map(
              (passage: IPassagePerDate) => parseInt(passage.total)
            ),
            fill: true,
            borderColor: '#1076FC',
            backgroundColor: '#1076FC14',
            tension: 0.4,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              color: '#000',
              font: {
                family: 'roboto',
                size: 12,
                weight: '600',
              },
            },
          },
        },
        onHover: (event, elements) => {
          const element = elements[0];
          if (element) {
            const index = element.index;
            this.totalHoveredPassageDate =
              this.dashboardData?.passagePerDate[index]?.total;
          }
          this.changeDetectorRef.detectChanges();
        },
      },
    });
  }
  public verifyIfRangeExists() {
    this.backgroundColor = [];
    this.rangeData = [
      { range: '08-10', imagePath: '/assets/img/slot1.svg', exist: false },
      { range: '10-12', imagePath: '/assets/img/slot2.svg', exist: false },
      { range: '12-14', imagePath: '/assets/img/slot3.svg', exist: false },
      { range: '14-16', imagePath: '/assets/img/slot4.svg', exist: false },
      { range: '16-18', imagePath: '/assets/img/slot5.svg', exist: false },
      { range: '18-20', imagePath: '/assets/img/slot6.svg', exist: false },
    ];

    this.rangeData.map((rangeToCheck) =>
      this.dashboardData.passagePerRange.some(
        (range) =>
          (rangeToCheck.exist = range.diffusion_range === rangeToCheck.range)
      )
    );
    return this.rangeData;
  }
  public calculateOnlineTvs() {
    return this.dashboardData.tvs.filter((tv) => tv.tv_status === 'on').length;
  }
  public calculateOfflineTvs() {
    return this.dashboardData.tvs.filter((tv) => tv.tv_status === 'off').length;
  }
  public navigateToDiffusion() {
    this.router.navigate(['/diffusions']);
  }
 
  public onDashboardSelectionDate(event: any) {
    let date = event.value.name;
    let periode = '';
    date === "Aujourd'hui"
      ? (periode = 't')
      : date === 'La semaine précédente'
      ? (periode = 'w')
      : (periode = 'm');
    this.dashboardFacade.loadDashboardData(periode);
  }

  exportToPDF(chartType: string): void {
    if (chartType === 'line') {
      const divToExport = document.querySelector(
        '.col.h-auto.bg.flex.flex-column.justify-content-around'
      ) as HTMLElement;
      this.renderChartToPdf(divToExport);
    } else {
      const divToExport = document.querySelector(
        '.col.h-auto.bg.flex.column-gap-2'
      ) as HTMLElement;
      this.renderChartToPdf(divToExport);
    }
  }
  public renderChartToPdf(divToExport: HTMLElement) {
    html2canvas(divToExport).then((canvas) => {
      const pdf = new jsPDF.jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL('image/png');
      const pdfImageWidth = pdfWidth;
      const pdfImageHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
      pdf.save('exported_div_content.pdf');
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
