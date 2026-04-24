import { User } from "src/model";

export class RequestLogin {
  username!: string;
  password!: string;
}

export class UserAuthResponse {
  email!: string;
  userId!: string;
  sub!: string;
  role!: string;
}
