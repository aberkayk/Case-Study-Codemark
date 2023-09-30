import { useMemo } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { useGetUsersQuery } from "../redux/features/user/user-service";
import { selectAllUsers } from "../redux/features/user/user-slice";

export const useUsers = () => {
  const users = useAppSelector(selectAllUsers);
  const { isLoading } = useGetUsersQuery({ limit: "0", skip: "0" });
  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: user.id.toString(),
        label: `${user.firstName} ${user.lastName}`,
      })),
    [users]
  );

  return { users, isLoading, userOptions };
};
