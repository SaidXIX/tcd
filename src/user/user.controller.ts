import { Controller, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, AssignRoleDto } from './dto';
import { JwtAuthGuard } from '../guards/jwt.guard'
import { RolesGuard } from '../guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('assign-role/:userId')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
  assignRole(@Param('userId') userId: string, @Body() assignRoleDto: AssignRoleDto) {
    return this.userService.assignRole(userId, assignRoleDto);
  }

  @Delete('delete/:userId')
  @UseGuards(JwtAuthGuard, new RolesGuard('ADMIN'))
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
