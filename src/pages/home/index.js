import React, { useState } from 'react';
import Reports from '../../components/reports';
import TransactionList from '../../components/transaction-list';
import LoginModal from '../../components/login-modal';
import WalletList from '../../components/wallet-list';

const Home = () => {
  const [open, setOpen] = useState(true);

  if (!localStorage.getItem('token')) {
    return <LoginModal open={open} setOpen={setOpen} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-1/2">
        <TransactionList />
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <div className="fixed">
          <WalletList />
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default Home;
