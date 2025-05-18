import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../../ContextProvider/ContextProvider";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}
