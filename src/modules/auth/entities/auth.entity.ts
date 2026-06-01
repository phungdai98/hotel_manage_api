export class RequestLogin {
  username!: string;
  password!: string;
}

export class RequestRefresh {
  refreshToken!: string;
}

export class UserAuthResponse {
  email!: string;
  userId!: string;
  sub!: string;
  role!: string;
}
