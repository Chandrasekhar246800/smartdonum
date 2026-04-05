import { redirect } from "next/navigation";

export default function PublicTrackPickupsRedirect() {
  redirect("/publicdonordashboard#requests");
}
