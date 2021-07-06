import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWallet } from '../../redux/slices/transaction';
import { getWalletsAsync } from '../../redux/slices/wallet';
import { formatter, random } from '../../utils/numberHelper';

const Wallet = ({ id, name, balance, iconUrl, onSelectWallet, selected }) => (
  <div
    className={`bg-white mt-4 mr-4 p-2 w-44 rounded flex items-center cursor-pointer ${
      selected && 'border-2 border-purple-400'
    }`}
    onClick={() => onSelectWallet(id)}
    aria-hidden="true"
  >
    <div className="w-12 h-12">
      <img
        alt=""
        src={iconUrl || `https://picsum.photos/id/${random(50)}/500/500`}
        className="rounded-full"
      />
    </div>
    <div className="flex flex-col px-3 flex-1 overflow-hidden">
      <span className="truncate">{name}</span>
      <span className="text-sm text-green-600 font-semibold">{formatter.format(balance || 0)}</span>
    </div>
  </div>
);

const WalletList = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallet.wallets);
  const selectedWallet = useSelector((state) => state.transaction.walletId);
  const handleWalletSelected = (id) => dispatch(selectWallet(id));

  useEffect(() => {
    dispatch(getWalletsAsync({}));
  }, [dispatch]);

  return (
    <div className="flex flex-wrap">
      {wallets.map((wallet) => (
        <Wallet
          key={wallet.id}
          {...wallet}
          onSelectWallet={handleWalletSelected}
          selected={selectedWallet === wallet.id}
        />
      ))}
    </div>
  );
};

export default WalletList;
