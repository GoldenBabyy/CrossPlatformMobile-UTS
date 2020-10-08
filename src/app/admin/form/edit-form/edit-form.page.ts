import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BarangService } from 'src/app/home/barang.service';
import { Barang } from 'src/app/home/home.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.page.html',
  styleUrls: ['./edit-form.page.scss'],
})
export class EditFormPage implements OnInit {
  editForm: FormGroup;
  loadedItem: Barang;

  constructor(
    private barangService: BarangService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('itemId')){ return; }
      const itemId = paramMap.get('itemId');
      this.loadedItem = this.barangService.getItem((itemId));
    });

    this.editForm = new FormGroup({
      url: new FormControl(this.loadedItem.imageUrl.join(','), {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      merk: new FormControl(this.loadedItem.merk, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      model: new FormControl(this.loadedItem.model, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      harga: new FormControl(this.loadedItem.price, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      stok: new FormControl(this.loadedItem.stock, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      detailProduk: new FormGroup({
        baseClock: new FormControl(this.loadedItem.desc[0].base, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        boostClock: new FormControl(this.loadedItem.desc[0].boost, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        core: new FormControl(this.loadedItem.desc[0].core, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        thread: new FormControl(this.loadedItem.desc[0].thread, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        speed:  new FormControl(this.loadedItem.desc[0].speed, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        ukuran:  new FormControl(this.loadedItem.desc[0].ukuran, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        chipset:  new FormControl(this.loadedItem.desc[0].chipset, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
        toMerk:  new FormControl(this.loadedItem.desc[0].toMerk, {
          // updateOn: 'change',
          // validators: [Validators.required]
        }),
      })
    })
  }

  editItem(){
    console.log(this.editForm.value)
    this.presentLoading('Editing item...').then(()=>{
    console.log(this.editForm.value.desc);

      this.barangService.editItem(this.loadedItem.id, this.editForm.value);
      this.router.navigate(['/admin']);
      this.presentToast('Item Edited', 'success');
    });
  }

  async onSubmit(){
    const alert = await this.alertCtrl.create({
      header: 'Edit Item',
      message: 'Do you really want to edit this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Edit',
          handler: () => this.editItem()
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
