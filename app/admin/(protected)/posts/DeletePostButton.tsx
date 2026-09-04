"use client";

export default function DeletePostButton({
  postId,
  title,
  action,
}: {
  postId: number;
  title: string;
  action: (formData: FormData) => void;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Supprimer définitivement l'article « ${title} » ?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="postId" value={postId} />
      <button type="submit" className="btn-text-link admin-delete-link">
        Supprimer
      </button>
    </form>
  );
}
