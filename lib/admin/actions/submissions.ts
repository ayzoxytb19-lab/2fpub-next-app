"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/admin/dal";
import { markSubmissionRead } from "@/lib/forms/data";

export async function markRead(formData: FormData): Promise<void> {
  await requirePermission("submissions.view");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) return;
  await markSubmissionRead(id);
  revalidatePath("/admin/soumissions");
}
