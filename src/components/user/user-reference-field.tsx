import { useGetUserByIdQuery } from "../../redux/features/user/user-service";

interface Props {
  userId: number;
}

const UserReferenceField = ({ userId }: Props) => {
  const { data: user } = useGetUserByIdQuery(userId);

  if (!user) return <div>-</div>;
  return <div>{user.firstName + " " + user.lastName}</div>;
};

export default UserReferenceField;
