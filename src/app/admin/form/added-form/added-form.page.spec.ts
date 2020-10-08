import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddedFormPage } from './added-form.page';

describe('AddedFormPage', () => {
  let component: AddedFormPage;
  let fixture: ComponentFixture<AddedFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddedFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
