import { useEffect, useState } from 'react';
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'
import Hero from '../components/sections/Hero'
import Allproduct from '../components/sections/Allproduct'

function ProductsPage() {
    return(
        <>
        <Header />
        {/* <Hero /> */}
        <Allproduct />
        <Footer />
        </>
    )
}

export default ProductsPage;