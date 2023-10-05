export interface LoginRes {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male";
  image: string;
  token: string;
}

export interface GetList {
  limit: string;
  skip: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface GetUsersRes {
  total: number;
  limit: number;
  skip: number;
  users: User[];
}

export interface GetPostsRes {
  total: number;
  limit: number;
  skip: number;
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface GetTodoRes {
  total: number;
  limit: number;
  skip: number;
  todos: Todo[];
}

export interface DeleteTodoRes {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted: boolean;
  deletedOn: string;
}

export type Option = {
  label: string;
  value: any;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface CreateTodoBody {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface CreatePostBody {
  post: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoBody {
  completed: boolean;
}

export interface UpdatePostBody {
  completed: boolean;
}
