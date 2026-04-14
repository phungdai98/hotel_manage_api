import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
