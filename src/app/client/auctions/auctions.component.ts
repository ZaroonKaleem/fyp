import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Router } from '@angular/router';

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

  constructor(private auctionService: AuctionService, private router: Router) {}

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
  navigateToBidding(auctionId: string): void {
    this.router.navigate(['/bidding', auctionId]);
  }
  // getAuctions(): void {
  //   this.auctionService.getAuctions().subscribe(
  //     (data) => {
  //       // Adjust the image URLs
  //       this.auctions = data.map((auction: any) => {
  //         // Replace backslashes with forward slashes
  //         auction.imageUrl = `${auction.productImage.replace(/\\/g, '/')}`;
          
  //         if (auction.duration) {
  //           const totalMinutes = Math.floor(auction.duration * 60); // Convert hours to total minutes
  //           const hours = Math.floor(totalMinutes / 60);
  //           const minutes = totalMinutes % 60;
  
  //           if (hours > 0) {
  //             auction.duration = `${hours}h ${minutes}m`;
  //           } else {
  //             auction.duration = `${minutes}m`; // Display only minutes if less than an hour
  //           }
  //         }

  //         return auction;
  //       });
  //       console.log(this.auctions);
  //       console.log(this.auctions.keys)
  //     },
  //     (error) => {
  //       console.error('Error fetching auctions:', error);
  //     }
  //   );
  // }
  
  getAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      (data) => {
        // Filter the data to include only auctions with accepted status as true
        this.auctions = data
          .filter((auction: any) => auction.accepted === 'accepted') // Filter by accepted status
          .map((auction: any) => {
            // Replace backslashes with forward slashes in image URL
            auction.imageUrl = `${auction.productImage.replace(/\\/g, '/')}`;
            
            // Convert duration to hours and minutes if duration exists
            if (auction.duration) {
              const totalMinutes = Math.floor(auction.duration * 60); // Convert hours to total minutes
              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
  
              // Format duration as "Xh Ym" or "Ym"
              auction.duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
            }
  
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