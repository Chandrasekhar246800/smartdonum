import { redirect } from "next/navigation";

export default function PublicViewRequestsRedirect() {
  redirect("/publicdonordashboard#requests");
}
