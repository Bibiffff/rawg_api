import Nav from "../nav/Nav";
import { DarkmodeProvider } from "../../providers/DarkmodeProvider";

const Layout = ({ children }) => {
    return (
        <>
        <DarkmodeProvider>
        <Nav />
        </DarkmodeProvider>
        <main className="container mt-4">
            {children}
        </main>
        </>
    );
};

export default Layout;