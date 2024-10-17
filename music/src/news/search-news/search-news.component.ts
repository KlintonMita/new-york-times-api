import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SearchNewsComponent {
  searchQuery: string = '';
  @Output() searchResults = new EventEmitter<{ articles: any[]; error: string }>();

  constructor(private newsService: NewsService) {}

  searchNews() {
    this.newsService.searchNews(this.searchQuery).subscribe(
      (data) => {
        if (data.message === "No matches found") {
          this.searchResults.emit({ articles: [], error: "No matches found" });
        } else {
          this.searchResults.emit({ articles: data.results, error: "" });
        }
      },
      (error) => {
        this.searchResults.emit({ articles: [], error: 'Error searching news: ' + error.message });
      }
    );
  }
}
