// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GreenCreditMarketplace {
    struct Listing {
        address seller;
        uint256 tokenAmount;
        uint256 ethPrice;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCount;

    event ListingAdded(uint256 listingId, address seller, uint256 tokenAmount, uint256 ethPrice);
    event PurchaseMade(uint256 listingId, address buyer, uint256 amountPaid);

    function addListing(uint256 tokenAmount, uint256 ethPrice) public {
        listingCount++;
        listings[listingCount] = Listing(msg.sender, tokenAmount, ethPrice, true);

        emit ListingAdded(listingCount, msg.sender, tokenAmount, ethPrice);
    }

    function buyCredits(uint256 listingId) public payable {
        Listing storage listing = listings[listingId];

        require(listing.isActive, "Listing is not active");
        require(msg.value >= listing.ethPrice, "Insufficient ETH sent");

        // Transfer ETH to the seller
        payable(listing.seller).transfer(msg.value);

        // Mark listing as inactive
        listing.isActive = false;

        emit PurchaseMade(listingId, msg.sender, msg.value);
    }

    function fetchListings() public view returns (Listing[] memory) {
        Listing[] memory activeListings = new Listing[](listingCount);
        uint256 count = 0;

        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].isActive) {
                activeListings[count] = listings[i];
                count++;
            }
        }

        return activeListings;
    }
}
