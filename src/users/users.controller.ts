import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
//import { query } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: any): Promise<User> {
    return this.usersService.create(createUserDto, req);
  }

  @Get()
  findAll(@Query() query: string): Promise<[User[], number]> {
    for (const queryKey of Object.keys(query)) {
      if(queryKey === "find-options") {
        return this.usersService.findAllWithOptions(decodeURI(query[queryKey]))
      }
    }

    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  /** Relationships */

  //    /user/1/roles/3 http verb @Patch
  @Patch(':userId/roles/:roleId')
  addRoleById(@Param('userId') userId: string, @Param('roleId') roleId: string): Promise<void> {
    return this.usersService.addRoleById(+userId, +roleId)
  }

  //  ?roleId=1&roleId=5
  @Patch(':userId/roles')
  addRolesById(@Param('userId') userId: string, @Query() query: string): Promise<void> {
    return this.usersService.addRolesById(+userId, query['roleId'])
  }
}
