import { useState } from 'react';
import { Link /*, useHistory */} from 'react-router-dom'; 
import useWeb3Provider from './useWeb3Provider';

const Navbar = () => {
  const [search, setSearch] = useState('');
 // const history = useHistory();
  const { web3Api, account, balance, shouldReload } = useWeb3Provider();

 /* const handleClick = (e) => {
    history.push(`/search/${search}`);
  } */

  const handleConnect = (e) => {
    web3Api.provider.request({method: "eth_requestAccounts"});
  }

  return (
    <nav className="navbar">
      <h1>Olive token</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About us</Link>
        <Link to="/buy-nft">Buy NFT</Link>
        <Link to="/stake-nft">Stake NFT</Link>
        {/*<Link to="/create">New Blog</Link>
         <input 
          type="text" 
          placeholder='Search...' 
          onChange={(e) => setSearch(e.target.value)}
        />
  <button onClick={handleClick}>Search</button> */}
        {!account && <button onClick={handleConnect}>Connect Wallet</button>}
        {account && <button className="connected" disabled>Connected</button>}
      </div>
    </nav>
  );
}
 
export default Navbar;