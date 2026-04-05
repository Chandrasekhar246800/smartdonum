import { redirect } from "next/navigation";

export default function OrganizationTrackPickupsRedirect() {
  redirect("/organizationdonordashboard#requests");
}
