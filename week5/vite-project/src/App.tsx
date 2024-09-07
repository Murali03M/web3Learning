import Footer from "./Footer";
import Topbar from "./Topbar";
import { Wallet } from "./Wallet";

export const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-700 flex flex-col">
              <Topbar />
            <div className="flex-grow flex justify-center mt-11">
                <Wallet />

            </div>
            <Footer/>
        </div>
    );
};
