// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParticipantsRegistry {
    struct Participant {
        address walletAddress;
        string name;
        uint256 credits;
    }

    mapping(address => Participant) private participants;
    address[] private participantAddresses;

    // Modifier to restrict access to only GreenCreditToken
    address public greenCreditToken;

    modifier onlyGreenCreditToken() {
        require(msg.sender == greenCreditToken, "Caller is not GreenCreditToken");
        _;
    }

    // Set the GreenCreditToken address
    function setGreenCreditToken(address _greenCreditToken) external {
        require(greenCreditToken == address(0), "GreenCreditToken already set");
        greenCreditToken = _greenCreditToken;
    }

    // Register a participant (only callable by GreenCreditToken)
    function registerParticipantFromToken(
        address _participant,
        string calldata _name,
        uint256 _credits
    ) external onlyGreenCreditToken {
        require(participants[_participant].walletAddress == address(0), "Already registered");
        participants[_participant] = Participant(_participant, _name, _credits);
        participantAddresses.push(_participant);
    }

    // Public view functions
    function getParticipants() public view returns (Participant[] memory) {
        Participant[] memory participantList = new Participant[](participantAddresses.length);
        for (uint256 i = 0; i < participantAddresses.length; i++) {
            participantList[i] = participants[participantAddresses[i]];
        }
        return participantList;
    }

    function isParticipantRegistered(address participant) public view returns (bool) {
        return participants[participant].walletAddress != address(0);
    }
}
