import { TestBed } from '@angular/core/testing';
import { MockDataService } from './mock-data';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver un array de artículos', () => {
    const news = service.getNews();
    expect(Array.isArray(news)).toBeTrue();
    expect(news.length).toBeGreaterThan(0);
  });

  it('cada artículo debería tener las propiedades requeridas', () => {
    const news = service.getNews();
    news.forEach(article => {
      expect(article.id).toBeDefined();
      expect(article.title).toBeTruthy();
      expect(article.subtitle).toBeTruthy();
      expect(article.imageUrl).toBeTruthy();
      expect(article.content).toBeTruthy();
    });
  });

  it('los ids de los artículos deberían ser únicos', () => {
    const news = service.getNews();
    const ids = news.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});