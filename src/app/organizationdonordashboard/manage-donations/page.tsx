import { redirect } from "next/navigation";

export default function OrganizationManageDonationsRedirect() {
  redirect("/organizationdonordashboard#donate");
}
