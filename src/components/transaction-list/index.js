import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getTransactionsAsync } from '../../redux/slices/transaction';
import { formatter, random } from '../../utils/numberHelper';

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  const groupByDate = _.groupBy(transactions, 'transactionDate');

  useEffect(() => {
    dispatch(getTransactionsAsync({}));
  }, [dispatch]);

  return _.map(groupByDate, (group, key) => {
    const date = moment(key);
    return (
      <div key={key} className="bg-white m-4 flex flex-col shadow">
        <div className="flex">
          <div className="text-4xl w-16 h-16 font-semibold flex items-center justify-center">
            {date.date()}
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-semibold text-gray-500">{date.format('dddd')}</div>
            <div className="text-sm">{date.format('MMMM YYYY')}</div>
          </div>
        </div>
        <div className="border-t" />
        {group.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center my-1">
            <div className="flex items-center">
              <div className="w-16 h-16 flex items-center justify-center p-2">
                <img
                  alt=""
                  src={`https://picsum.photos/id/${random(500)}/500/500`}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">{transaction.title}</div>
                <div className="text-sm">{transaction.detail}</div>
              </div>
            </div>
            <div className="m-3">{formatter.format(transaction.amount)}</div>
          </div>
        ))}
      </div>
    );
  });
};

export default TransactionList;
