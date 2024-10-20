import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchNewsComponent } from './search-news/search-news.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, SearchNewsComponent, NgClass],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{

  newsArticles: any[] = [];
  errorMessage: string = '';
  isSearchMode: boolean = false;

  constructor(private newsService: NewsService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loadTopNews();
  }

  handleSearchResults(articles: any[], error: string) {
    this.newsArticles = articles;
    this.errorMessage = error;
    this.isSearchMode = true;
    this.hideMainNews();
  }

  resetSearch() {
    this.isSearchMode = false;
  }

  loadTopNews(): void {
    this.newsService.getTopNews().subscribe(
      (data) => {
        this.newsArticles = data.results;
        console.log('Loaded news articles:', this.newsArticles);
        setTimeout(() => {
          this.showMainNews();
        }, 0);
      },
      (error) => {
        this.errorMessage = 'Error fetching news: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }


  showMainNews() {
    const mainNewsElement = this.el.nativeElement.querySelector('#mainnews');
    if (mainNewsElement) {
      this.renderer.setStyle(mainNewsElement, 'display', 'block');
      console.log('Showing main news');
    } else {
      console.error('Main news element not found');
    }
  }

  hideMainNews() {
    const mainNewsElement = this.el.nativeElement.querySelector('#mainnews');
    if (mainNewsElement) {
      this.renderer.setStyle(mainNewsElement, 'display', 'none');
    } else {
      console.error('Main news element not found');
    }
  }

}

