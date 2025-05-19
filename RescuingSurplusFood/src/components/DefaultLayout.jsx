import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import NavHeader from "./NavHeader";

function DefaultLayout() {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  );
}
export default DefaultLayout;