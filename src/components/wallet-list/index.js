import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletsAsync } from '../../redux/slices/wallet';
import { formatter, random } from '../../utils/numberHelper';

const Wallet = ({ name, amount, iconUrl }) => {
  return (
    <div className="bg-white m-4 p-4 rounded flex items-center">
      <div className="w-12 h-12">
        <img
          alt=""
          src={iconUrl || `https://picsum.photos/id/${random(200)}/500/500`}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col px-4">
        <span>{name}</span>
        <span>{formatter.format(amount || 0)}</span>
      </div>
    </div>
  );
};

const WalletList = () => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallet.wallets);

  useEffect(() => {
    dispatch(getWalletsAsync({}));
  }, [dispatch]);

  return (
    <div className="flex">
      <Wallet name="Total" />
      {wallets.map((wallet) => (
        <Wallet key={wallet.id} {...wallet} />
      ))}
    </div>
  );
};

export default WalletList;
