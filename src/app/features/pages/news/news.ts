import { Component, OnInit } from '@angular/core';
import { ArticleCard } from '../../../shared/components/article-card/article-card';
import { Article } from '../../../models/article.model';
import { MockDataService } from '../../../core/services/mock-data';


/**
 * Componente de la Página de Noticias.
 *
 * Esta página se encarga de mostrar las últimas novedades y actualizaciones del juego.
 * Actúa como un componente "inteligente" (Smart Component) que:
 * 1. Solicita los datos al servicio de datos (MockDataService).
 * 2. Almacena la lista de artículos.
 * 3. Pasa cada artículo al componente hijo 'ArticleCard' para su visualización.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ArticleCard],
  templateUrl: './news.html',
  styleUrl: './news.css'
})
export class News implements OnInit {
  articles: Article[] = [];


  constructor(private dataService: MockDataService) {}

  /** Artículo seleccionado al hacer clic en una tarjeta. */
  selectedArticle: Article | null = null;

  ngOnInit() {
    this.articles = this.dataService.getNews();
  }

  /**
   * Gestiona el evento @Output emitido por ArticleCard.
   * Almacena el artículo seleccionado para mostrarlo en detalle.
   * @param article - El artículo sobre el que se hizo clic.
   */
  onArticleSelected(article: Article): void {
    this.selectedArticle = article;
  }
}