import { ComponentFixture, TestBed } from '@angular/core/testing';
import { News } from './news';
import { MockDataService } from '../../../core/services/mock-data';
import { Article } from '../../../models/article.model';

describe('News', () => {
  let component: News;
  let fixture: ComponentFixture<News>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [News]
    }).compileComponents();

    fixture = TestBed.createComponent(News);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar artículos al iniciar', () => {
    expect(component.articles.length).toBeGreaterThan(0);
  });

  it('debería actualizar selectedArticle al recibir evento de ArticleCard', () => {
    const mockArticle: Article = {
      id: 99,
      title: 'Test',
      subtitle: 'Sub',
      imageUrl: 'url',
      content: 'contenido'
    };
    component.onArticleSelected(mockArticle);
    expect(component.selectedArticle).toEqual(mockArticle);
  });

  it('los artículos cargados deberían tener id y título', () => {
    component.articles.forEach(a => {
      expect(a.id).toBeDefined();
      expect(a.title).toBeTruthy();
    });
  });
});
