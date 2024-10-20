import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { NewsComponent } from '../news.component';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, NewsComponent],
})
export class SearchNewsComponent {
  searchQuery: string = '';
  newsArticles: any[] = [];
  errorMessage: string = '';
  @Input() hideMainNews!: () => void;

  @Output() searchResults = new EventEmitter<{ articles: any[]; error: string }>();

  constructor(private newsService: NewsService) {}

  searchNews() {
    this.newsService.searchNews(this.searchQuery).subscribe(
      (data) => {
        if (data.message === "No matches found") {
          this.newsArticles = [];
          this.errorMessage = "No matches found";
        } else {
          this.newsArticles = data.results;
          this.errorMessage = '';
          this.hideMainNews();
        }
      },
      (error) => {
        this.newsArticles = [];
        this.errorMessage = 'Error searching news: ' + error.message;
      }
    );
  }
}
