import Navbar from './components/Navbar';
import Manager from "./components/Manager";
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-red-300 shadow-lg">
        <Navbar />
      </div>
      <div className="relative  bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
      </div>
      <div>
      <Footer />
      </div>
    </>
  );
}

export default App;
