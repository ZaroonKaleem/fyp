import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrl: './auctions-list.component.css'
})
export class AuctionsListComponent {
  auctions: any[] = [];
  isLoading = true;
  error: string = '';

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data.map((auction: { duration: number; }) => ({
          ...auction,
          // Convert duration to hours, days, or minutes
          formattedDuration: this.formatDuration(auction.duration),
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching auctions';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  
  // Helper method to format duration
  formatDuration(duration: number): string {
    if (duration >= 24) {
      const days = Math.floor(duration / 24);
      const hours = Math.round(duration % 24);
      return `${days} day${days > 1 ? 's' : ''} ${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''}`;
    } else if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return `${Math.round(duration)} hour${duration > 1 ? 's' : ''}`;
    }
  }
  
}