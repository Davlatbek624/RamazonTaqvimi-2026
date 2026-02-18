import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Komponentlar
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTitle from './components/PageTitle';

// Sahifalar
import Home from './pages/Home';
import Taqvim from './pages/Taqvim';
import Duolar from './pages/Duolar';
import Yangiliklar from './pages/Yangiliklar';
import NotFoundPage from './pages/NotFoundPage';
import Kontakt from './pages/Kontakt';



const App = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-[#022c22]">
      <Navbar />

      <main className="grow pt-24"> {/* Navbar tagiga kirib ketmasligi uchun pt-24 */}
        <Routes>
          {/* Asosiy sahifada PageTitle bo'lmasligi mumkin (Oy animatsiyasi borligi uchun) */}
          <Route path='/' element={<><Home />
            <PageTitle title={t("ramazonn")} />
          </>} />

          {/* Taqvim */}
          <Route path='/taqvim' element={
            <>
              <PageTitle title={t("titles.taqvim")} />
              <Taqvim />
            </>
          } />

          {/* Duolar */}
          <Route path='/duolar' element={
            <>
              <PageTitle title={t("titles.duolar")} />
              <Duolar />
            </>
          } />

          {/* Yangiliklar */}
          <Route path='/yangiliklar' element={
            <>
              <PageTitle title={t("titles.yangiliklar")} />
              <Yangiliklar />
            </>
          } />
          <Route path='/kontakt'
            element={
              <>
                <PageTitle title={t("titles.boglanish")} />
                <Kontakt />
              </>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;