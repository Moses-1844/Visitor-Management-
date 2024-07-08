import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OwnerDashboardService } from './owner-dashboard.service';
import { ChangeDetectorRef } from '@angular/core';
import { catchError, of } from 'rxjs';
import { InstitutionService } from '../common/pages/view-institutions/institution.service';
import swal from 'sweetalert2';
import Chart from 'chart.js/auto';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit, AfterViewInit {
  totalVisitorsToday: number = 0;
  banks: any[] = [];
  support: any[] = [];
  activeBanks: number = 0;
  filteredBanks: any[] = [];
  searchText: string = '';
  columnToSort: string = 'name';
  reverseSort: boolean = false;
  itemsPerPage: number = 5;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'Event 1', date: '2024-06-20' },
      { title: 'Event 2', date: '2024-06-21' }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trafficChart') trafficChart!: ElementRef<HTMLCanvasElement>;
  cdr: any;

  constructor(private dashboardService: OwnerDashboardService, private institutionService: InstitutionService) {}

  ngOnInit(): void {
    this.fetchTotalVisitorsToday();
    this.getBanks(); // Fetch banks data
    this.getSupport();
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.initTrafficChart();
  }

  handleDateClick(arg: any) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('Event clicked: ' + arg.event.title);
  }

  fetchTotalVisitorsToday(): void {
    this.dashboardService.getTotalVisitorsToday().subscribe(
      total => {
        this.totalVisitorsToday = total;
      },
      error => {
        console.error('Error fetching total visitors for today', error);
      }
    );
  }

  getBanks(): void {
    this.institutionService.getBanks().pipe(
      catchError(error => {
        console.error('Error occurred while fetching banks: ', error);
        return of([]);
      })
    ).subscribe(banks => {
      this.banks = banks;
      this.filteredBanks = [...this.banks];
      this.cdr.detectChanges(); // Trigger change detection manually
    });
  }

  setItemsPerPage(num: number): void {
    this.itemsPerPage = num;
  }

  sort(columnName: string): void {
    this.columnToSort = columnName;
    this.reverseSort = !this.reverseSort;
    this.filteredBanks.sort((a, b) => {
      const comparison = a[columnName] > b[columnName] ? 1 : -1;
      return this.reverseSort ? -comparison : comparison;
    });
  }

  applyFilters(): void {
    this.filteredBanks = this.banks.filter(bank =>
      bank.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.registrationNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      bank.address.toString().toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getSupport(): void {
    this.dashboardService.getSupport().subscribe(
      data => {
        this.support = data;
      },
      error => {
        console.error('Error fetching support requests', error);
      }
    );
  }

  initChart(): void {
    const canvas = this.myChart.nativeElement.getContext('2d');
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.banks.map(bank => bank.name),
        datasets: [{
          label: '# of Visitors',
          data: this.banks.map(bank => bank.registrationNumber), // Replace with actual data
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initTrafficChart(): void {
    const trafficCanvas = this.trafficChart.nativeElement.getContext('2d');
    new Chart(trafficCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Online Booking', 'Walk-in Booking'],
        datasets: [{
          data: [60, 40], // Replace with actual data
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
