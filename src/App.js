import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './pages/Main/About';
import GlotAi from './pages/Main/GlotAi';
import Pricing from './pages/Main/Pricing';

import Login from './pages/Login/Login';
import Idsearch from './pages/Login/Idsearch';
import ChangePw from './pages/Login/ChangePw';
import NewPw from './pages/Login/NewPw';
import SignUp from './pages/Login/SignUp';
import Writing from './pages/Writing/Writing';
import Paper from './pages/Writing/WritingTest';

import Mypage from './pages/Mypage/Mypage';
import GroupInfo from './pages/Mypage/GroupInfo';
import PaidInfo from './pages/Mypage/PaidInfo';
import FreeInfo from './pages/Mypage/FreeInfo';
import BasicPrice from './pages/Pricing/BasicPricing';
import EnterprisePrice from './pages/Pricing/EnterprisePricing';
import Payment from './pages/Pricing/Pricing';

function App() {
  return (
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/glotai" element={<GlotAi />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/idsearch" element={<Idsearch />} />
        <Route path="/member/changepw" element={<ChangePw />} />
        <Route path="/member/newpw" element={<NewPw />} />
        <Route path="/member/signup" element={<SignUp />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing_paper" element={<Paper />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/groupinfo" element={<GroupInfo />} />
        <Route path="/mypage/paid_info" element={<PaidInfo />} />
        <Route path="/mypage/free_info" element={<FreeInfo />} />
        <Route path="/payment/basic" element={<BasicPrice />} />
        <Route path="/payment/enterprise" element={<EnterprisePrice />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/test" element={<Paper />} />
      </Routes>
  );
}

export default App;
