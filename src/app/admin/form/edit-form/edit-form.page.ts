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

  getJenis() {
    // console.log(this.editForm.get('jenis').value);
    if(this.loadedItem.jenis == 'cpu'){
      this.editForm.get('detailProduk').get('baseClock').setValidators([Validators.required]);
      this.editForm.get('detailProduk').get('boostClock').setValidators([Validators.required]);
      this.editForm.get('detailProduk').get('core').setValidators([Validators.required]);
      this.editForm.get('detailProduk').get('thread').setValidators([Validators.required]);

      this.editForm.get('detailProduk').get('baseClock').updateValueAndValidity();
      this.editForm.get('detailProduk').get('boostClock').updateValueAndValidity();
      this.editForm.get('detailProduk').get('core').updateValueAndValidity();
      this.editForm.get('detailProduk').get('thread').updateValueAndValidity();
    }
    else if(this.loadedItem.jenis == 'ram'){
      this.editForm.get('detailProduk').get('speed').setValidators([Validators.required]);
      this.editForm.get('detailProduk').get('ukuran').setValidators([Validators.required]);

      this.editForm.get('detailProduk').get('speed').updateValueAndValidity();
      this.editForm.get('detailProduk').get('ukuran').updateValueAndValidity();
    }
    else if(this.loadedItem.jenis == 'mb'){
      this.editForm.get('detailProduk').get('chipset').setValidators([Validators.required]);
      this.editForm.get('detailProduk').get('toMerk').setValidators([Validators.required]);

      this.editForm.get('detailProduk').get('chipset').updateValueAndValidity();
      this.editForm.get('detailProduk').get('toMerk').updateValueAndValidity();
    }
  }
  editItem(){
    this.presentLoading('Editing item...').then(()=>{
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
