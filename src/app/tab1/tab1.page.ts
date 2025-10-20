import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export interface Receipt {
  id: number;
  description: string;
  amount: number;
  date: Date;
  paidBy?: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  receipts: Receipt[] = [];
  totalAmount: number = 0;
  currentDate: string = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  constructor() {}

  async ngOnInit() {
    await this.loadReceipts();
  }

  private async loadReceipts() {
    try {
      const data = await Filesystem.readFile({
        path: 'receipts/data.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      
      if (data.data) {
        this.receipts = JSON.parse(data.data as string);
        this.calculateTotal();
      }
    } catch (error) {
      console.log('No hay recibos guardados');
      this.receipts = [];
    }
  }

  private calculateTotal() {
    this.totalAmount = this.receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  }

  async doRefresh(event: any) {
    try {
      await this.loadReceipts();
    } finally {
      // Complete the refresh and hide the spinner
      event.target.complete();
    }
  }
}
