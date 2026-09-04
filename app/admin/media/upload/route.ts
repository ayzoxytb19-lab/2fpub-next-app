import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getCurrentUserOrNull, hasPermission } from "@/lib/admin/dal";
import { logActivity } from "@/lib/admin/log";

export const runtime = "nodejs";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 Mo
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

// Route Handler (et non Server Action) car elle est appelée depuis le
// composant client d'upload de photo pour récupérer immédiatement une URL,
// avant même que le formulaire d'article ne soit soumis.
export async function POST(request: NextRequest) {
  const user = await getCurrentUserOrNull();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  if (!hasPermission(user, "media.upload")) {
    return NextResponse.json({ error: "Vous n'avez pas la permission d'ajouter des photos." }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Format non supporté (jpg, png, webp ou gif uniquement)." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Image trop lourde (8 Mo maximum)." }, { status: 400 });
  }

  const extension = file.type.split("/")[1] ?? "jpg";
  const pathname = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  let blobUrl: string;
  try {
    const blob = await put(pathname, file, { access: "public" });
    blobUrl = blob.url;
  } catch (err) {
    console.error("Échec upload Vercel Blob:", err);
    return NextResponse.json(
      { error: "Échec de l'envoi de l'image. Vérifiez que le stockage Blob est bien connecté (BLOB_READ_WRITE_TOKEN)." },
      { status: 500 }
    );
  }

  await logActivity({
    actorId: user.id,
    actorEmail: user.email,
    action: "media.upload",
    targetType: "media",
    targetLabel: pathname,
  });

  return NextResponse.json({ url: blobUrl });
}
