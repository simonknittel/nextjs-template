import clsx from "clsx";
import { getSentEmails } from "../queries";

type Props = Readonly<{
  className?: string;
}>;

export const SentEmails = async ({ className }: Props) => {
  const emails = await getSentEmails();

  return (
    <div className={clsx(className, "flex flex-col gap-4")}>
      {emails.map((email) => (
        <article key={email.id}>
          <div className="flex gap-2">
            <h3 className="font-bold">{email.email}</h3>

            <time className="text-neutral-500">
              {email.createdAt.toLocaleDateString("de-de", {
                dateStyle: "medium",
              })}{" "}
              {email.createdAt.toLocaleTimeString("de-de", {
                timeStyle: "short",
              })}
            </time>
          </div>

          <pre className="font-sans">
            <p>{email.body}</p>
          </pre>
        </article>
      ))}
    </div>
  );
};
