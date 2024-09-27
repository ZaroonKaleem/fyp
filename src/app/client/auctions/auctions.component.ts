import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css'
})
export class AuctionsComponent implements OnInit {
  categories: string[] = ['Electronics', 'Furniture', 'Vehicles', 'Collectibles'];
  selectedCategory: string = '';
  selectedStatus: string = '';
  auctions: any[] = []; // Array to hold the fetched auctions
  filteredAuctions = this.auctions;

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.filterAuctions();
    this.getAuctions();
  }

  filterAuctions(): void {
    this.filteredAuctions = this.auctions.filter(auction => 
      (this.selectedCategory === '' || auction.category === this.selectedCategory) &&
      (this.selectedStatus === '' || auction.status === this.selectedStatus)
    );
  }

  getAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      (data) => {
        // Adjust the image URLs
        this.auctions = data.map((auction: any) => {
          // Replace backslashes with forward slashes
          auction.imageUrl = `${auction.productImage.replace(/\\/g, '/')}`;
          return auction;
        });
        console.log(this.auctions);
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }
  
  
}