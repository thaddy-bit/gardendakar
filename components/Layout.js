// components/Layout.js
import Header from './Header';
import Footer from './Footer';
// import { AuthProvider } from "../context/AuthContext";

export default function Layout({ children }) {
  return (
      <div className="">
        <Header />
        <main className="">
          {children}
        </main>
        <Footer/>
      </div>
  );
}