import NavbarPrincipal from "./NavbarPrincipal";
import Footer from "./Footer";

function PrincipalLayout({ children }) {
  return (
    <div>
      <NavbarPrincipal />
      <main style={{ padding: 20, minHeight: "calc(100vh - 220px)" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PrincipalLayout;
