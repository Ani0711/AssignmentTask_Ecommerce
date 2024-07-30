import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service'; // Ensure this service exists and is imported
import { Product } from '../models/product'; // Ensure the Product model is defined and imported
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  totalRevenue: number = 0;
  mostSoldProducts: Product[] = [];
  productsSold: { product: Product, quantity: number, totalRevenue: number }[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(public salesService: SalesService) { }

  ngOnInit(): void {
    this.loadSalesReport();
  }

  loadSalesReport(): void {
    this.loading = true;
    this.error = null;

    this.salesService.getSalesReport().subscribe(
      data => {
        this.totalRevenue = data.totalRevenue;
        this.mostSoldProducts = data.mostSoldProducts;
        this.productsSold = data.productsSold;
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load sales report';
        this.loading = false;
      }
    );
  }
}
