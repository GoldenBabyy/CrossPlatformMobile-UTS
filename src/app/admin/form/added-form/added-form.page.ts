import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { BarangService } from 'src/app/home/barang.service';
import { Barang } from 'src/app/home/home.model';

@Component({
  selector: 'app-added-form',
  templateUrl: './added-form.page.html',
  styleUrls: ['./added-form.page.scss'],
})
export class AddedFormPage{
  addedForm: FormGroup;
  items: Barang[];

  constructor(
    private barangService: BarangService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ionViewWillEnter(){
    this.items = this.barangService.getAllItems();
  }

  ngOnInit() {
    this.items = this.barangService.getAllItems();
    
    this.addedForm = new FormGroup({
      url: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      merk: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      jenis: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      model: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      harga: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      stok: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      detailProduk: new FormGroup({
        baseClock: new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        boostClock: new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        core: new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        thread: new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        speed:  new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        ukuran:  new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        chipset:  new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
        toMerk:  new FormControl(null, {
          updateOn: 'change',
          validators: null
        }),
      })
    })
    this.addedForm.get('jenis').updateValueAndValidity();
  }

  getJenis() {
    if(this.addedForm.get('jenis').value == 'cpu'){
      this.addedForm.get('detailProduk').get('baseClock').setValidators([Validators.required]);
      this.addedForm.get('detailProduk').get('boostClock').setValidators([Validators.required]);
      this.addedForm.get('detailProduk').get('core').setValidators([Validators.required]);
      this.addedForm.get('detailProduk').get('thread').setValidators([Validators.required]);

      this.addedForm.get('detailProduk').get('baseClock').updateValueAndValidity();
      this.addedForm.get('detailProduk').get('boostClock').updateValueAndValidity();
      this.addedForm.get('detailProduk').get('core').updateValueAndValidity();
      this.addedForm.get('detailProduk').get('thread').updateValueAndValidity();
    }
    else if(this.addedForm.get('jenis').value == 'ram'){
      this.addedForm.get('detailProduk').get('speed').setValidators([Validators.required]);
      this.addedForm.get('detailProduk').get('ukuran').setValidators([Validators.required]);

      this.addedForm.get('detailProduk').get('speed').updateValueAndValidity();
      this.addedForm.get('detailProduk').get('ukuran').updateValueAndValidity();
    }
    else if(this.addedForm.get('jenis').value == 'mb'){
      this.addedForm.get('detailProduk').get('chipset').setValidators([Validators.required]);
      this.addedForm.get('detailProduk').get('toMerk').setValidators([Validators.required]);

      this.addedForm.get('detailProduk').get('chipset').updateValueAndValidity();
      this.addedForm.get('detailProduk').get('toMerk').updateValueAndValidity();
    }
  }
  
  onSubmit(){
    this.presentLoading('Adding item...').then(()=>{
      this.barangService.addItem(this.addedForm.value);
      this.router.navigate(['/admin']);
      this.presentToast('Item Added', 'success');
    });
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
