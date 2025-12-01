import { Component, OnInit } from '@angular/core';
import { ArticleCard } from '../../../shared/components/article-card/article-card';
import { Article } from '../../../models/article.model';
import { MockDataService } from '../../../core/services/mock-data';


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

  ngOnInit() {
    this.articles = this.dataService.getNews();
    console.log('MIS NOTICIAS SON:', this.articles);
  }
}