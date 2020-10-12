import { Injectable } from '@angular/core';
import { Barang } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class BarangService {
  private items: Barang[] = [
    {
      id: 'B01',
      nama: 'AMD Athlon',
      jenis: 'cpu',
      merk: 'AMD',
      imageUrl: ['https://www.pemmzchannel.com/wp-content/uploads/2016/05/procesador-amd-athlon-x4-860k-quad-core-37ghz-.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToswbCGLW7DYn2MeNrzHnZoi7cQbmcow5I7g&usqp=CAU'],
      model: 'Athlon',
      price: 2000000,
      stock: 0,
      desc: [{base: 4.40, boost: 4.80, core: 4, thread: 8}]
    },
    {
      id: 'B02',
      nama: 'Intel Core i7',
      jenis: 'cpu',
      merk: 'Intel',
      imageUrl: ['https://2.bp.blogspot.com/-FKjRbaRKYpY/USR0_1fjVjI/AAAAAAAAAZo/UWWAmJ7Ywc0/s200/Intel.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShToRA3pckhbm-LlucGyd-smJ2dm6WQ9WilQ&usqp=CAU'],
      model: 'Core i7',
      price: 1500000,
      stock: 10,
      desc: [{base: 4.40, boost: 4.80, core: 4, thread: 8}]
    },
    {
      id: 'B03',
      nama: 'Dell Vostro',
      jenis: 'ram',
      merk: 'Dell',
      imageUrl: ['https://www.esus-it.com/eng_pl_Memory-RAM-4GB-DELL-Vostro-3400-DDR3-1333MHz-SODIMM-4206_1.jpg', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2015/6/6/152396/152396_1702b83c-0c54-11e5-88c6-aea864efb121.jpg', "https://www.hardwaretimes.com/wp-content/uploads/2019/12/RAM_Stock_Image__00265.1561545512.jpg"],
      model: 'Vostro',
      price: 700000,
      stock: 4,
      desc: [{speed: '8400', ukuran: '4'}]
    },
    {
      id: 'B04',
      nama: 'Motherboard G41',
      jenis: 'mb',
      merk: 'Motherboard',
      imageUrl: ['https://upload.wikimedia.org/wikipedia/commons/b/b7/Computer-motherboard.jpg', 'https://miro.medium.com/max/800/1*gaNOskXGiXR51GooI58ZPg.png', 'https://miro.medium.com/max/1050/1*_uMcwSzvbH3UpGpNoAzAGg.png', 'https://miro.medium.com/max/840/1*qsIN-o__hqK0IT6DA1bRIg.png', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/12/19/11252813/11252813_156d405d-6f4f-4e0d-bd3e-895734028a6a_473_400.jpg'],
      model: 'G41',
      price: 300000,
      stock: 1,
      desc: [{chipset: 'Northbridge', toMerk: 'Intel'}]
    },    
    {
      id: 'B05',
      nama: 'GPU ASUS G1',
      jenis: 'gpu',
      merk: 'GPU ASUS',
      imageUrl: ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTUWBawEkhkmieR7Sa6-rCnQiaJTDedYAjnA&usqp=CAU'],
      model: 'G1',
      price: 1200000,
      stock: 1,
      desc: [{}]
    }
  ];

  constructor() { }

  getAllItems(){
    return [...this.items];
  }

  getItem(itemId: string){
    return {...this.items.find(item => {
      return item.id === itemId;
    })};
  }

  deleteItem(itemId: string){
    this.items = this.items.filter(item => {
      return item.id !== itemId;
    });
  }

  addItem(item){    
    let ids = this.items[this.items.length-1].id.slice(2);
    let idx = parseInt(ids) + 1;
    let objDesc = {};

    if(item.jenis == 'cpu')
      objDesc = {
        base: item.detailProduk.baseClock,
        boost: item.detailProduk.boostClock,
        core: item.detailProduk.core,
        thread: item.detailProduk.thread
      };
    else if(item.jenis == 'ram'){
      objDesc = {
        speed: item.detailProduk.speed,
        ukuran: item.detailProduk.ukuran,
      };
    } 
    else if(item.jenis == 'mb'){
      objDesc = {
        chipset: item.detailProduk.chipset,
        toMerk: item.detailProduk.toMerk,
      };
    }
    else{
      objDesc={}
    }
    this.items.push({
      id: "B0"+idx,
      nama: item.merk + ' ' + item.model,
      jenis: item.jenis,
      merk: item.merk,
      imageUrl: item.url.split(','),
      model: item.model,
      price: item.harga,
      stock: item.stok,
      desc: [objDesc]
    })
  }

  editItem(id, item){
    let objDesc = {};
    const idx = this.items.findIndex((obj => obj.id === id));

    if(this.items[idx].jenis == 'cpu')
      objDesc = {
        base: item.detailProduk.baseClock,
        boost: item.detailProduk.boostClock,
        core: item.detailProduk.core,
        thread: item.detailProduk.thread
      };
    else if(this.items[idx].jenis == 'ram'){
      objDesc = {
        speed: item.detailProduk.speed,
        ukuran: item.detailProduk.ukuran,
      };
    } 
    else if(this.items[idx].jenis == 'mb'){
      objDesc = {
        chipset: item.detailProduk.chipset,
        toMerk: item.detailProduk.toMerk,
      };
    }
    else{
      objDesc={}
    }

    this.items[idx]={
      id: id, 
      nama: item.merk + item.model,
      jenis: this.items[idx].jenis,
      merk: item.merk,
      imageUrl: item.url.split(','),
      model: item.model,
      price: item.harga,
      stock: item.stok,
      desc: [objDesc]
    }
  }
}
