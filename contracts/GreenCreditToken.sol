// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IParticipantsRegistry {
    function isParticipantRegistered(address participant) external view returns (bool);
    function registerParticipantFromToken(
        address _participant,
        string calldata _name,
        uint256 _credits
    ) external;
}

contract GreenCreditToken is ERC20, Ownable {
    mapping(string => bool) public verifiedCertificates; // Stores verified certificate IDs
    IParticipantsRegistry public participantsRegistry;

    constructor(address _participantsRegistry) Ownable(msg.sender) ERC20("GreenCreditToken", "GCT") {
        participantsRegistry = IParticipantsRegistry(_participantsRegistry);
    }

    // Mint tokens after certificate verification
    function mintGreenCredits(
        address to,
        uint256 amount,
        string memory certificateId,
        string memory participantName
    ) external onlyOwner {
        require(!verifiedCertificates[certificateId], "Certificate already used");

        // Register participant if not already registered
        if (!participantsRegistry.isParticipantRegistered(to)) {
            participantsRegistry.registerParticipantFromToken(to, participantName, amount);
        }

        // Mark certificate as used and mint tokens
        verifiedCertificates[certificateId] = true;
        _mint(to, amount);
    }
}
