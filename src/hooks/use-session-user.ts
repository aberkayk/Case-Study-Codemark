import { useMemo } from "react";
import { getFirstChar } from "../lib/utils";
import { useAppSelector } from "../redux/app/hooks";
import { selectUser } from "../redux/features/auth/auth-slice";

export const useSessionUser = () => {
  const user = useAppSelector(selectUser);

  const { fullname, shortname } = useMemo(() => {
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const fullname = `${firstName} ${lastName}`;
    const shortname = `${getFirstChar(firstName)}${getFirstChar(lastName)}`;
    return { fullname, shortname };
  }, [user]);

  return { fullname, shortname, ...user };
};
