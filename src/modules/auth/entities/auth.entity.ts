import { User } from "src/model";

export class RequestLogin {
  username!: string;
  password!: string;
}

export class UserAuthResponse {
  email: string;
  userId: string;
  sub: string;
  role?: string;

  constructor(user: Partial<UserAuthResponse>) {
    this.email = user.email || "";
    this.userId = user.userId || "";
    this.sub = user.sub || "";
    this.role = user.role || "";
  }
}
