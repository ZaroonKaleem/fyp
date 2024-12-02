import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrl: './sell-item.component.css'
})
export class SellItemComponent implements OnInit {
  isLoggedIn: boolean = false;

  item: any = {
    name: '',
    description: '',
    startingBid: '',
    auctionEndTime: ''
  };
  
  selectedFile: File | null = null;

  // Hardcoded API base URL
  apiUrl = 'http://localhost:3000/api/auctions';

  constructor(private http: HttpClient) {}


ngOnInit() {
  // Check if the token exists in local storage
  this.isLoggedIn = !!localStorage.getItem('token');
}

  // Handle file input change
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  // LoginFirst(){
  //   if(this.isLoggedIn = false){
  //     alert("log in first !")
  //   }
  // }

  // Handle form submission
  onSubmit() {
    if(this.isLoggedIn = false){
      alert("Please log in to post an auction.");
    } else {
    // Ensure a file has been selected
    if (!this.selectedFile) {
      alert('Please upload an image.');
      return;
    }
  
    // Calculate the duration in hours from current time to auction end time
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    const auctionEndTime = new Date(this.item.auctionEndTime).getTime(); // Get auction end time in milliseconds
    const durationInHours = (auctionEndTime - currentTime) / (1000 * 60 * 60); // Calculate duration in hours
  
    // Ensure the auction end time is in the future
    if (durationInHours <= 0) {
      alert('Please select an auction end time in the future.');
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append('name', this.item.name);
    formData.append('description', this.item.description);
    formData.append('startingPrice', this.item.startingBid);
    formData.append('duration', durationInHours.toString()); // Pass duration as a string
    formData.append('productImage', this.selectedFile); // Append the image file
  
    // Send a POST request to the backend
    this.http.post(`${this.apiUrl}/request/add`, formData).subscribe(
      (response: any) => {
        alert('Auction listed successfully!');
      },
      (error) => {
        console.error('Error listing auction:', error);
        alert('Error listing auction.');
      }
    );
  }
}
}
