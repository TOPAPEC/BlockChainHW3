// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MegaContract {
    struct MegaStruct {
        uint id;
        string name;
        string content;
        bool isActive;
        address userAddress;
    }

    mapping(uint => MegaStruct) public myMapping;

    event StructureAdded(uint id);
    event StructureRemoved(uint id);

    function addStruct(uint _id, string memory _name, string memory _content, bool _isActive, address _userAddress) public {
        myMapping[_id] = MegaStruct(_id, _name, _content, _isActive, _userAddress);
        emit StructureAdded(_id);
    }

    function removeStruct(uint _id) public {
        delete myMapping[_id];
        emit StructureRemoved(_id);
    }
}
