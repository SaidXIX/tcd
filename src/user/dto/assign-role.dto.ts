import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

enum ROLE {
    admin = 'ADMIN',
    manager = 'MANAGER',
    client = 'CLIENT',
  }

export class AssignRoleDto {
    @ApiProperty({ description: 'The new role to assign to the user' })
    @IsNotEmpty()
    @IsEnum(ROLE, { message: 'Role must be either ADMIN, MANAGER, or CLIENT' })
    role: ROLE;
}
