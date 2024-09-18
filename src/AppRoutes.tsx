import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainView from './pages/PetViewSection/MainView'
import Login from './pages/authentication/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />


      <Route path="/" element={<MainView />} />

      {/* <Route path="login" element={<LoginPage />} /> */}

      {/* <Route path="inventory" element={<InventorySystem />}>
        <Route path="" element={<Dashboard />} />
        <Route path="category" element={<CategorySection />} />
        <Route path="sub-category" element={<SubCategorySection />} />
        <Route path="suppliers" element={<SupplierSection />} />
        <Route path="products" element={<ProductSection />} />
        <Route path="stocks" element={<StockSection />} />
      </Route>
      <Route path="reciepe" element={<ReceipySystem />}>
        <Route path="" element={<Dashboard />} />
      </Route> */}
    </Routes>
  )
}

export default AppRoutes