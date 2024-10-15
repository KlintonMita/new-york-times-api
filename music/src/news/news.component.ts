import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchNewsComponent } from './search-news/search-news.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, SearchNewsComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  newsArticles: any[] = [];
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadTopNews();
  }

  loadTopNews(): void {
    this.newsService.getTopNews().subscribe(
      (data) => {
        this.newsArticles = data.results;
      },
      (error) => {
        this.errorMessage = 'Error fetching news: ' + error.message;
      }
    );
  }
}

