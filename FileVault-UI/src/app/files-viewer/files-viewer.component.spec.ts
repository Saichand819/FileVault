import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewerComponent } from './files-viewer.component';

describe('FilesViewerComponent', () => {
  let component: FilesViewerComponent;
  let fixture: ComponentFixture<FilesViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesViewerComponent]
    });
    fixture = TestBed.createComponent(FilesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
