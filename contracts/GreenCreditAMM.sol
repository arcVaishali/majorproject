// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GreenCreditAMM {
    IERC20 public greenToken;  // ERC20 token representing green credits

    uint256 public totalLiquidity;  // Total liquidity in the contract
    mapping(address => uint256) public liquidity;

    event LiquidityAdded(address indexed user, uint256 ethAmount, uint256 tokenAmount);
    event LiquidityRemoved(address indexed user, uint256 ethAmount, uint256 tokenAmount);
    event EthToTokenSwap(address indexed user, uint256 ethAmount, uint256 tokenAmount);
    event TokenToEthSwap(address indexed user, uint256 tokenAmount, uint256 ethAmount);

    constructor(address _greenToken) {
        greenToken = IERC20(_greenToken);
    }

    // Add liquidity to the pool (ETH + GreenCreditTokens)
    function addLiquidity(uint256 tokenAmount) external payable {
        require(msg.value > 0 && tokenAmount > 0, "Provide ETH and Tokens");
        require(greenToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");

        // Update liquidity balance
        liquidity[msg.sender] += msg.value;
        totalLiquidity += msg.value;

        emit LiquidityAdded(msg.sender, msg.value, tokenAmount);
    }

    // Remove liquidity from the pool
    function removeLiquidity(uint256 ethAmount, uint256 tokenAmount) external {
        require(ethAmount > 0 && tokenAmount > 0, "Invalid amounts");
        require(liquidity[msg.sender] >= ethAmount, "Insufficient liquidity");

        // Update liquidity balance
        liquidity[msg.sender] -= ethAmount;
        totalLiquidity -= ethAmount;

        // Transfer ETH and tokens back to the user
        payable(msg.sender).transfer(ethAmount);
        require(greenToken.transfer(msg.sender, tokenAmount), "Token transfer failed");

        emit LiquidityRemoved(msg.sender, ethAmount, tokenAmount);
    }

    // Swap ETH for GreenCreditToken (Minting)
    function ethToToken(uint256 minTokens) external payable {
        uint256 tokenReserve = greenToken.balanceOf(address(this));
        uint256 ethReserve = address(this).balance;

        uint256 tokensOut = (msg.value * tokenReserve) / ethReserve;
        require(tokensOut >= minTokens, "Insufficient output");

        require(greenToken.transfer(msg.sender, tokensOut), "Token transfer failed");

        emit EthToTokenSwap(msg.sender, msg.value, tokensOut);
    }

    // Swap GreenCreditToken for ETH (Burning)
    function tokenToEth(uint256 tokenAmount, uint256 minEth) external {
        uint256 tokenReserve = greenToken.balanceOf(address(this));
        uint256 ethReserve = address(this).balance;

        uint256 ethOut = (tokenAmount * ethReserve) / tokenReserve;
        require(ethOut >= minEth, "Insufficient output");

        require(greenToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");
        payable(msg.sender).transfer(ethOut);

        emit TokenToEthSwap(msg.sender, tokenAmount, ethOut);
    }

    // View current reserves of ETH and GreenCreditTokens
    function getReserves() external view returns (uint256 ethReserve, uint256 tokenReserve) {
        ethReserve = address(this).balance;
        tokenReserve = greenToken.balanceOf(address(this));
    }
}
