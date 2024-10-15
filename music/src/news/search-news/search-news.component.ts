import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-search-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-news.component.html',
  styleUrl: './search-news.component.scss'
})
export class SearchNewsComponent {
  searchQuery: string = '';
  newsArticles: any[] = [];
  errorMessage: string = '';

  constructor(private newsService: NewsService) {}

  searchNews(): void {
    if (!this.searchQuery) {
      return;
    }

    this.newsService.searchNews(this.searchQuery).subscribe(
      (data) => {
        this.newsArticles = data.response.docs;
      },
      (error) => {
        this.errorMessage = 'Error searching news: ' + error.message;
      }
    );
  }
}
