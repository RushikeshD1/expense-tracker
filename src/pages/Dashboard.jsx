import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Card";
import { Modal } from 'antd';
import AddExpense from "../components/AddExpense";
import AddIncome from "../components/AddIncome";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth)

  const fetchTransaction = async() => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, `users/${user.uid}/transactions`));
      let transactionsArray = []
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data())
      });
      setTransaction(transactionsArray);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }
 
  useEffect(() => {
    // Get all transcation from doc
    fetchTransaction()
  }, [])

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
    const newTransation = {
      type:type,
      date: values.date.format("YYYY-MM-DD"),
      amount : parseFloat(values.amount),
      tag : values.tag,
      name : values.name
    }
    
    addTransaction(newTransation);
  }

  const addTransaction = async (transaction) => {
    // Add Doc
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction)
      console.log("Document written with id", docRef, docRef.id)
      toast.success("Transaction Added!")
    } catch (error) {
      toast.error(error.message)
    }
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
