import { requirePermissionForPage, hasPermission } from "@/lib/admin/dal";
import { createPost } from "@/lib/admin/actions/posts";
import PostForm from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const user = await requirePermissionForPage("posts.create", "/admin/posts");

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Nouvel article</h1>
      <PostForm action={createPost} canPublish={hasPermission(user, "posts.publish")} submitLabel="Enregistrer" />
    </div>
  );
}
