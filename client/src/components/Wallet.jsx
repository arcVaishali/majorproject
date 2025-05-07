import Web3 from 'web3';

export const connectWallet = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet", error);
    }
  } else {
    alert("Please install Metamask!");
  }
};
