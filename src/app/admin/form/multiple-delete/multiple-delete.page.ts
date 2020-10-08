import { Component, OnInit } from '@angular/core';
import { BarangService } from 'src/app/home/barang.service';
import { Barang } from 'src/app/home/home.model';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-multiple-delete',
  templateUrl: './multiple-delete.page.html',
  styleUrls: ['./multiple-delete.page.scss'],
})
export class MultipleDeletePage implements OnInit{
  items: Barang[];
  deleteSelected :any = [];

  constructor(
    private router: Router,
    private barangService: BarangService,   
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit(){
    this.items = this.barangService.getAllItems();
  }

  deleteMultipel(item) {
    let index = this.deleteSelected.indexOf(item);
    if (index !== -1) {
      this.deleteSelected.splice(index, 1);
    }
    else {
      this.deleteSelected.push(item);
    }
  }

  logDeleteStudents() {
    this.presentLoading().then(()=>{
      this.deleteSelected.forEach((item) => {
        this.barangService.deleteItem(item.id);
      });
      this.deleteSelected = [];
      this.router.navigate(['/admin']);
    });
  }

  async presentAlert(item: Barang){
    const alert = await this.alertCtrl.create({
      header: 'Multiple Delete Item',
      message: 'Do you really want to delete the item/items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.logDeleteStudents()
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Items deleted.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message: 'Deleting items...',
      duration: 2000
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();
  }
}
