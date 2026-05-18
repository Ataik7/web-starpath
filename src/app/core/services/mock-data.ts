import { Injectable } from '@angular/core';
import { Article } from '../../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService { 
  constructor() { }

  getNews(): Article[] {
    //Noticias de ejemplo hasta que se haya creado el juego
  return [
    {
      id: 1,
      title: '¡Lanzamiento de la Beta!',
      subtitle: 'Ya puedes probar el sistema de combate.',
      imageUrl: 'assets/images/beta.png',
      content: 'El equipo ha trabajado duro...'
    },
    {
      id: 2,
      title: 'Nuevos Personajes',
      subtitle: 'Descubre al Mago y al Guerrero.',
      imageUrl: 'assets/images/nuevos-heroes.png',
      content: 'Hemos añadido dos clases nuevas...'
    },
    {
      id: 3,
      title: 'Actualización de Magia',
      subtitle: 'Nuevos hechizos de fuego y hielo.',
      imageUrl: 'assets/images/magia.png',
      content: 'El sistema de partículas ha mejorado...'
    }
  ];
}
}