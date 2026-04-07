import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import { Modal } from 'antd';
import AddExpense from "../components/AddExpense";
import AddIncome from "../components/AddIncome";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    console.log("On finish", values, type);
  }

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddIncome open={isIncomeModalVisible} onCancel={handleIncomeCancel} onFinish={onFinish} footer={null}/>
      <AddExpense open={isExpenseModalVisible} onCancel={handleExpenseCancel} onFinish={onFinish} footer={null} />
    </div>
  );
};

export default Dashboard;
