// components/Layout.js
import Header_Kya from './Header_Kya';
import Footer from './Footer';

export default function Master({ children }) {
  return (
    <div className="">
      <Header_Kya />
      <main className="">
        {children}
      </main>
      <Footer/>
    </div>
  );
}