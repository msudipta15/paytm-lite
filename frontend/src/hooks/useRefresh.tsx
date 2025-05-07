import { useNavigate } from "react-router-dom";

export function useRefresh() {
  const navigate = useNavigate();

  navigate("/dashboard_new");
}
