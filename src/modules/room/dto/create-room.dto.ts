import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    floor: string;

    @IsNotEmpty()
    @IsString()
    rankRoomId: string;
}
