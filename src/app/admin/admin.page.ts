import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, LoadingController, ToastController, IonItemSliding, ModalController } from '@ionic/angular';
import { BarangService } from '../home/barang.service';
import { Barang } from '../home/home.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  items: Barang[];

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
  }

  menuBar(){
    this.menuCtrl.open();
  }

  deleteItem(item, slidingItem){
    this.presentLoading('Deleting item...').then(()=>{
      this.barangService.deleteItem(item.id);
      this.router.navigate(['/admin']);
      this.items = this.barangService.getAllItems();
      this.presentToast('Item Deleted', 'danger');
      slidingItem.close();
    });
  }

  edit(item, slidingItem){
    this.router.navigate(['./admin/edit-form', item.id]);
    slidingItem.close();
  }

  async presentAlert(item: Barang, slidingItem: IonItemSliding){
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
          handler: () => this.deleteItem(item, slidingItem)
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msg: string, colors:string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors
    });
    toast.present();
  }

  async presentLoading(msg: string){
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 2000
    });
    await loading.present();

    const {role, data} = await loading.onDidDismiss();
  }
}
