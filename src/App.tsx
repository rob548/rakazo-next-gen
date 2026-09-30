import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Bots from '@/pages/Bots';
import SelfHost from '@/pages/SelfHost';
import OpenSource from '@/pages/OpenSource';
import Docs from '@/pages/Docs';
import Faq from '@/pages/Faq';
import Changelog from '@/pages/Changelog';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Account from '@/pages/Account';
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="bots" element={<Bots />} />
        <Route path="self-host" element={<SelfHost />} />
        <Route path="open-source" element={<OpenSource />} />
        <Route path="docs" element={<Docs />} />
        <Route path="faq" element={<Faq />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
