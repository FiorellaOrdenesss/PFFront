import NavbarPrincipal from "./NavbarPrincipal";

function PrincipalLayout({ children }) {
  return (
    <div>
      <NavbarPrincipal />
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}

export default PrincipalLayout;
