import { useEffect, useState } from 'react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';
import CategoryProducts from '../components/sections/page/CategoryProducts'

export default function PageCategoryProducts({ categoryId }) {
  return(
    <>
      <Header/>
      <CategoryProducts categoryId={categoryId}/>
      <Footer/>
    </>
  )
}


