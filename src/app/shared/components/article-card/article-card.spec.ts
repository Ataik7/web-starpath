import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCard } from './article-card';
import { Article } from '../../../models/article.model';

describe('ArticleCard', () => {
  let component: ArticleCard;
  let fixture: ComponentFixture<ArticleCard>;

  const mockArticle: Article = {
    id: 1,
    title: 'Título de prueba',
    subtitle: 'Subtítulo de prueba',
    imageUrl: 'https://example.com/img.jpg',
    content: 'Contenido de prueba'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCard]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir un artículo por @Input', () => {
    component.article = mockArticle;
    fixture.detectChanges();
    expect(component.article.title).toBe('Título de prueba');
  });

  it('debería emitir el artículo por @Output al hacer clic', () => {
    component.article = mockArticle;
    let emittedArticle: Article | undefined;
    component.cardClick.subscribe((a: Article) => emittedArticle = a);
    component.onCardClick();
    expect(emittedArticle).toEqual(mockArticle);
  });

  it('no debería emitir nada si article es undefined', () => {
    component.article = undefined;
    let emitted = false;
    component.cardClick.subscribe(() => emitted = true);
    component.onCardClick();
    expect(emitted).toBeFalse();
  });
});
