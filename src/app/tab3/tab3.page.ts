import { Component } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { NavController } from '@ionic/angular';

export interface Receipt {
  id: number;
  description: string;
  amount: number;
  image: string | null;
  date: Date;
  paidBy?: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  receipts: Receipt[] = [];
  isModalOpen = false;
  selectedReceipt: Receipt | null = null;

  constructor(private navCtrl: NavController) {
    this.loadReceipts();
  }

  ionViewWillEnter() {
    this.loadReceipts();
  }

  async loadReceipts() {
    try {
      const data = await Filesystem.readFile({
        path: 'receipts/data.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });

      if (data.data) {
        const parsedReceipts = JSON.parse(data.data as string);
        this.receipts = parsedReceipts.map((receipt: any) => ({
          ...receipt,
          date: new Date(receipt.date)
        }));
      }
    } catch (error) {
      console.log('No hay recibos guardados o hubo un error al cargarlos');
      this.receipts = [];
    }
  }

  openReceiptModal(receipt: Receipt) {
    this.selectedReceipt = receipt;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedReceipt = null;
    }, 200);
  }
}
