import { redirect } from "next/navigation";

export default function PublicManageDonationsRedirect() {
  redirect("/publicdonordashboard#donate");
}
