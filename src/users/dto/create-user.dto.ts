
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    idCard: string;
    phone?: string;
    address?: string;
    role?: string;
    partId?: string;
}
