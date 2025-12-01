import { Component, Input } from '@angular/core';
import { Article } from '../../../models/article.model';

/**
 * Componente de Tarjeta de Artículo (ArticleCard).
 *
 * Este componente reutilizable se encarga de representar la información visual
 * de una única noticia o artículo. Está diseñado para ser utilizado dentro de
 * listas o rejillas en otras páginas.
 *
 * Recibe los datos del artículo a través de una propiedad de entrada (@Input),
 * cumpliendo con el requisito de comunicación Padre-Hijo.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [], 
  templateUrl: './article-card.html',
  styleUrl: './article-card.css'
})
export class ArticleCard{
  
  /**
   * Propiedad de entrada (Input).
   * Recibe el objeto 'Article' desde el componente padre (por ejemplo, NewsComponent).
   * Contiene el título, subtítulo, imagen y contenido a mostrar.
   */
  @Input() article: Article | undefined;
}



