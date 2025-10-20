import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AlertController, NavController } from '@ionic/angular';

export interface Receipt {
  id: number;
  description: string;
  amount: number;
  image: string;
  date: Date;
  paidBy: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  newReceipt = {
    description: '',
    amount: null as number | null,
    image: null as string | null,
    date: new Date(),
    paidBy: ''
  };
  
  selectedPerson = '';
  isSubmitting = false;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  selectPerson(person: string) {
    this.newReceipt.paidBy = person;
    this.selectedPerson = person;
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      
      if (image.webPath) {
        this.newReceipt.image = image.webPath;
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.showAlert('Error', 'No se pudo tomar la foto. Por favor intente de nuevo.');
    }
  }

  async saveReceipt() {
    this.isSubmitting = true;

    try {
      let receipts: Receipt[] = [];
      
      try {
        const data = await Filesystem.readFile({
          path: 'receipts/data.json',
          directory: Directory.Data,
          encoding: Encoding.UTF8
        });
        if (data.data) {
          receipts = JSON.parse(data.data as string);
        }
      } catch (error) {
        console.log('No hay recibos existentes, creando nueva lista');
      }

      const newReceipt: Receipt = {
        id: Date.now(),
        description: this.newReceipt.description,
        amount: Number(this.newReceipt.amount),
        image: this.newReceipt.image || '',
        date: new Date(),
        paidBy: this.newReceipt.paidBy
      };

      receipts.unshift(newReceipt);
      
      await Filesystem.writeFile({
        path: 'receipts/data.json',
        data: JSON.stringify(receipts),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: true
      });

      await this.saveReceiptToFile(newReceipt);

      this.newReceipt = {
        description: '',
        amount: null,
        image: null,
        date: new Date(),
        paidBy: this.selectedPerson
      };

      await this.showAlert('Éxito', 'Recibo guardado correctamente');
      this.navCtrl.navigateRoot('/tabs/tab1');

    } catch (error) {
      console.error('Error al guardar el recibo:', error);
      this.showAlert('Error', 'No se pudo guardar el recibo. Por favor intente de nuevo.');
    } finally {
      this.isSubmitting = false;
    }
  }

  private async saveReceiptToFile(receipt: Receipt) {
    try {
      const fileName = `recibo_${receipt.id}.txt`;
      const content = `Recibo #${receipt.id}\nFecha: ${receipt.date.toLocaleString()}\nDescripción: ${receipt.description}\nMonto: ₡${receipt.amount.toFixed(2)}\nPagado por: ${receipt.paidBy}`;
      
      await Filesystem.writeFile({
        path: `receipts/${fileName}`,
        data: content,
        directory: Directory.Data,
        recursive: true
      });
    } catch (error) {
      console.error('Error al guardar el archivo del recibo:', error);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }
}
