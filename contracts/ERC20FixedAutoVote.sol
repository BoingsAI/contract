// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
/**
 * @dev {ERC20} token, including:
 *
 *  - Preminted initial supply
 *  - Ability for holders to burn (destroy) their tokens
 *  - No access control mechanism (for minting/pausing) and hence no governance
 *
 * This contract uses {ERC20Burnable} to include burn capabilities - head to
 * its documentation for details.
 *
 * _Available since v3.4._
 */
contract ERC20FixedAutoVote is ERC20, AccessControlEnumerable, ERC20Permit, ERC20Votes {
    uint8 _decimal;

    /**
     * @dev Mints `initialSupply` amount of token and transfers them to `owner`.
     *
     * See {ERC20-constructor}.
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner,
        uint8 decimals
    ) ERC20(name, symbol) ERC20Permit(name){
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _mint(owner, initialSupply);
        _decimal=decimals;

    }

    function _mint(address to, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        if (delegates(to) == address(0)) {
            _delegate(to, to);
            super._afterTokenTransfer(from, address(0), amount);
            return;
        }
        super._afterTokenTransfer(from, to, amount);
    }
    function decimals() public view virtual override returns (uint8) {
        return _decimal==0?18:_decimal;
    }
}
