import { Component } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Barang } from './home.model';
import { BarangService } from './barang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Barang[];
  grid: boolean = true;

  constructor(
    private barangService: BarangService, 
    private menuCtrl: MenuController,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  ionViewWillEnter(){
    this.items = this.barangService.getAllItems();
    this.grid = this.grid;  
  }

  menuBar(){
    this.menuCtrl.open();
  }

  switchView(){
    this.grid = !this.grid;
  }

  deleteItem(item, slidingItem, views){
    this.presentLoading().then(()=>{
      this.barangService.deleteItem(item.id);
      if(views=='grid')
        this.router.navigate(['/']);
      else
        this.router.navigate(['/home/home-grid']);
      this.presentToast();
      slidingItem.close();
    });
  }

  async presentAlert(item: Barang, slidingItem: IonItemSliding, views: String){
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => this.deleteItem(item, slidingItem, views)
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item deleted.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message: 'Deleting item...',
      duration: 2000
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();
  }
}
