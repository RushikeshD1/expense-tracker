import React from "react";
import { Button, Card, Row } from "antd";
const { Meta } = Card;

const Cards = ({showExpenseModal, showIncomeModal, currentBalance=0, income=0, expenses=0}) => {

  return (
    <Row className="px-4 py-6 flex justify-between items-center flex-wrap">
      <Card title="Current Balance" className="text-center w-[31%] shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <p>₹{currentBalance}</p>
          <Button type="primary" className="w-full">
            Reset Balance
          </Button>
        </div>
      </Card>
      <Card title="Total Income" className="text-center w-[31%] shadow-md">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <p>₹{income}</p>
          <Button onClick={showIncomeModal} type="primary" className="w-full">
           Add Income
          </Button>
        </div>
      </Card>
      <Card title="Total Expenses" className="text-center w-[31%] shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
          <p>₹{expenses}</p>
          <Button onClick={showExpenseModal} type="primary" className="w-full">
            Add Expenses
          </Button>
        </div>
      </Card>
    </Row>
  );
};

export default Cards;
