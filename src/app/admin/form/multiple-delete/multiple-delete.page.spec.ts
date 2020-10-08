import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultipleDeletePage } from './multiple-delete.page';

describe('MultipleDeletePage', () => {
  let component: MultipleDeletePage;
  let fixture: ComponentFixture<MultipleDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
