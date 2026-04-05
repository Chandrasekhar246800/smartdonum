import { redirect } from "next/navigation";

export default function OrganizationViewRequestsRedirect() {
  redirect("/organizationdonordashboard#requests");
}
