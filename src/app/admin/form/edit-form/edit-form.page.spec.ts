import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFormPage } from './edit-form.page';

describe('EditFormPage', () => {
  let component: EditFormPage;
  let fixture: ComponentFixture<EditFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
