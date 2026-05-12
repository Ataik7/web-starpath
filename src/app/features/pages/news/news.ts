import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
 * 4. Escucha el evento (@Output) de ArticleCard y gestiona el artículo seleccionado.
 * 5. Permite buscar y filtrar artículos por texto en tiempo real.
 *
 * @author Iván Gastineau
 * @version 1.2
 */
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ArticleCard, FormsModule],
  templateUrl: './news.html',
  styleUrl: './news.css'
})
export class News implements OnInit {
  articles: Article[] = [];
  /** Artículo seleccionado al hacer clic en una tarjeta. */
  selectedArticle: Article | null = null;
  /** Texto de búsqueda introducido por el usuario. */
  searchQuery = '';

  constructor(private dataService: MockDataService) {}

  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta al iniciar el componente.
   * Carga los artículos desde el servicio de datos.
   */
  ngOnInit() {
    this.articles = this.dataService.getNews();
  }

  /**
   * Filtra los artículos según el texto de búsqueda.
   * Busca coincidencias en título y subtítulo.
   * @returns Array de artículos filtrados.
   */
  get filteredArticles(): Article[] {
    if (!this.searchQuery.trim()) return this.articles;
    const query = this.searchQuery.toLowerCase();
    return this.articles.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.subtitle.toLowerCase().includes(query)
    );
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
