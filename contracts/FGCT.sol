// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <8.10.0;

contract Token {
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    constructor(uint256 initialSupply) public {
        _totalSupply = initialSupply;
        _balances[msg.sender] = initialSupply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_balances[msg.sender] >= _value, "Insufficient balance");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_balances[_from] >= _value, "Insufficient balance");
        _balances[_from] -= _value;
        _balances[_to] += _value;
        return true;
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "Mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;
    }
}

contract StandardToken is Token {
    constructor(uint256 initialSupply) Token(initialSupply) public {}

    function transfer(address _to, uint256 _value) public returns (bool success) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        return super.transferFrom(_from, _to, _value);
    }
}

contract FGCT is StandardToken {
    constructor(uint256 initialSupply) StandardToken(initialSupply) public {}

    // Mapping to store verified entities
    mapping(address => bool) public verifiedEntities;

    // Event to log verification of entities
    event EntityVerified(address indexed entity);

    // Function to verify entities by the owner
    function verifyEntity(address entity) external {
        verifiedEntities[entity] = true;
        emit EntityVerified(entity);
    }

    // Function to issue tokens to verified entities
    function issueTokens(address entity, uint256 amount) external {
        require(verifiedEntities[entity], "Entity not verified by ICFRE");
        _mint(entity, amount);
    }

    // Override transfer function
    function transfer(address _to, uint256 _value) public returns (bool success) {
        return super.transfer(_to, _value);
    }

    // Override transferFrom function
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        return super.transferFrom(_from, _to, _value);
    }
}