import type { FC } from "react";
import type { User } from "~/models/user";

export const UserCard: FC<{ user: User; index: number }> = ({
  user,
  index,
}) => {
  const nameColor = user.name ? "text-black" : "text-red-600";
  return (
    <article
      className="bg-blue-50 m-4 rounded shadow-md/50 transition-shadow duration-200 hover:shadow-xl"
      key={user.id + "_" + index}
    >
      <a
        href={`mailto:${user.email}`}
        className="p-3 md:flex md:shadow-md/50 transition-shadow duration-200 hover:shadow-xl"
      >
        <div className="ps-4 md:w-56 md:pt-2">
          <span
            className={`text-center md:text-right font-semibold truncate ${nameColor}`}
          >
            <i className="bi-file-earmark-person me-1" />
            {user.name || "Unknown"}
          </span>
          <div className="pe-4 md:w-68 md:pb-2 text-blue-700 truncate">
            <i className="bi-envelope me-1" />
            {user.email}
          </div>
        </div>
        <div className="ps-4 md:w-40 md:p-2 text-black md:text-end rounded">
          <i className="bi-calendar-check" /> last updated at
          <span className="ms-1 md:ms-0 md:block">
            {(() => {
              try {
                return new Date(
                  user.createdAt >= user.updatedAt && user.updatedAt
                    ? user.createdAt
                    : user.updatedAt
                ).toLocaleDateString();
              } catch {
                return "Unknown";
              }
            })()}
          </span>
        </div>
      </a>
    </article>
  );
};
