import React from 'react';
import TransactionList from '../../components/transaction-list';
import Reports from '../../components/reports';
import WalletList from '../../components/wallet-list';

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2">
        <TransactionList />
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <div className="h-1/2">
          <Reports />
        </div>
        <div className="h-1/2">
          <WalletList />
        </div>
      </div>
    </div>
  );
};

export default Home;
