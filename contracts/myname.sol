contract MyName {
    uint256 public constant version = 1;
    mapping(address => string) public myname;

    event SetName(address indexed owner, string name);

    function setname(string memory newname) external {
        address owner = msg.sender;
        myname[owner] = newname;
        emit SetName(owner, newname);
    }
}