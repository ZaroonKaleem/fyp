import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
export interface Auction {
  name: string;
  startingPrice: number;
  description: string;
  duration: number; // in hours
  productImage: File | null; // Product image file
}

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrl: './add-auction.component.css'
})
export class AddAuctionComponent {
  auction = {
    name: '',
    startingPrice: 0,
    description: '',
    duration: 0
  };
  selectedFile: File | null = null;

  constructor(private auctionService: AuctionService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile && this.auction.name && this.auction.startingPrice && this.auction.description && this.auction.duration) {
      const formData = new FormData();
      formData.append('name', this.auction.name);
      formData.append('startingPrice', this.auction.startingPrice.toString());
      formData.append('description', this.auction.description);
      formData.append('duration', this.auction.duration.toString());
      formData.append('productImage', this.selectedFile);

      this.auctionService.addAuction(formData).subscribe(
        (response) => {
          console.log('Auction added:', response);
        },
        (error) => {
          console.error('Error adding auction:', error);
        }
      );
    } else {
      console.error('Please fill all fields and select an image');
    }
  }
}
