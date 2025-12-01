/**
 * Interfaz que define la estructura de un Artículo o Noticia.
 *
 * Se utiliza para tipar los datos que se muestran en las tarjetas de noticias
 * y que provienen del servicio de datos simulado (MockDataService).
 *
 * @author Iván Gastineau
 * @version 1.0
 */
export interface Article {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
}