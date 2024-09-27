// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BidService } from '../../services/bidding.service';

// export interface Bid {
//   item: string;
//   amount: number;
//   image: string; // Add the image property
// }


// @Component({
//   selector: 'app-bidding',
//   templateUrl: './bidding.component.html',
//   styleUrl: './bidding.component.css'
// })
// export class BiddingComponent implements OnInit {
//   auctionId: number | null = null;
//   auction: any; // Replace `any` with your auction interface/type if defined

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.paramMap.get('id');
//     this.auctionId = idParam !== null ? +idParam : null;
//     if (this.auctionId !== null) {
//       this.loadAuctionDetails(this.auctionId);
//     } else {
//       console.error('Auction ID is null');
//       // Handle the case where auctionId is null (e.g., show an error message or redirect)
//     }
//   }

//   loadAuctionDetails(id: number) {
//     // Replace this mock with your actual data retrieval logic
//     const mockAuctions = [
//       {
//         id: 1,
//         title: 'Antique Vase',
//         description: 'A beautiful antique vase from the Ming Dynasty.',
//         image: 'assets/vase.jpg',
//         timeLeft: '2h 45m',
//         startingAmount: 100
//       },
//       {
//         id: 2,
//         title: 'Vintage Car',
//         description: 'A restored vintage car from the 1960s.',
//         image: 'assets/car.jpg',
//         timeLeft: '5h 30m',
//         startingAmount: 20000
//       },
//       {
//         id: 3,
//         title: 'Modern Art',
//         description: 'A stunning piece of modern art by a renowned artist.',
//         image: 'assets/painting.jpg',
//         timeLeft: '1d 4h',
//         startingAmount: 5000
//       }
//     ];

//     this.auction = mockAuctions.find(auction => auction.id === id);
//   }
// }





import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Bid {
  item: string;
  amount: number;
  image: string; // Image property to hold the auction item's image URL
}

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'] // Fix the typo here from `styleUrl` to `styleUrls`
})
export class BiddingComponent implements OnInit {
  auctionId: number | null = null;
  auction: any; // You can replace `any` with your auction interface/type if defined
  bidAmount: number | null = null; // Define the bidAmount property
  bids: Bid[] = [ // Initialize with some dummy bids
    {
      item: 'Anonymous User',
      amount: 120,
      image: 'assets/vase.jpg'
    },
    {
      item: 'Anonymous User',
      amount: 200,
      image: 'assets/car.jpg'
    },
    {
      item: 'Anonymous User',
      amount: 300,
      image: 'assets/painting.jpg'
    }
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.auctionId = idParam !== null ? +idParam : null;
    if (this.auctionId !== null) {
      this.loadAuctionDetails(this.auctionId);
    } else {
      console.error('Auction ID is null');
      // Handle the case where auctionId is null (e.g., show an error message or redirect)
    }
  }

  loadAuctionDetails(id: number) {
    // Replace this mock with your actual data retrieval logic
    const mockAuctions = [
      {
        id: 1,
        title: 'Antique Vase',
        description: 'A beautiful antique vase from the Ming Dynasty.',
        image: 'assets/vase.jpg',
        timeLeft: '2h 45m',
        startingAmount: 100
      },
      {
        id: 2,
        title: 'Vintage Car',
        description: 'A restored vintage car from the 1960s.',
        image: 'assets/car.jpg',
        timeLeft: '5h 30m',
        startingAmount: 20000
      },
      {
        id: 3,
        title: 'Modern Art',
        description: 'A stunning piece of modern art by a renowned artist.',
        image: 'assets/painting.jpg',
        timeLeft: '1d 4h',
        startingAmount: 5000
      }
    ];

    this.auction = mockAuctions.find(auction => auction.id === id);
  }

  submitBid() {
    if (this.bidAmount !== null && this.auction) {
      const newBid: Bid = {
        item: this.auction.title,
        amount: this.bidAmount,
        image: this.auction.image
      };
      this.bids.push(newBid);
      this.bidAmount = null; // Reset bid amount after submitting
    } else {
      console.error('Bid amount is null or auction details are not available');
    }
  }
}
