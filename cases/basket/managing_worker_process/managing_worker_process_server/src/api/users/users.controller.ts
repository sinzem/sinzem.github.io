import { Request } from 'express';
import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    Req, 
    UseGuards, 
    UsePipes 
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from 'src/services/pipes/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/api/auth/roles-auth.decorator';
import { RolesGuard } from 'src/api/auth/roles-guard';

@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @UsePipes(ValidationPipe)
    // @Post() 
    // createUser(@Body() dto: CreateUserDto) { 
    //     return this.usersService.createUser(dto);
    // }

    @Roles(["MANAGER", "AFFILIATE"])
    @UseGuards(RolesGuard)
    @Put()
    @UsePipes(ValidationPipe)
    updateUser(
        @Body() dto: UpdateUserDto,
        @Req() req: Request
    ) {
        return this.usersService.updateUser(dto, req);
    }

    @Roles(["MANAGER", "AFFILIATE"])
    @UseGuards(RolesGuard)
    @Get()
    getAll(@Req() request: Request) {
        return this.usersService.getAllUsers(request.query);
    }

    @Roles(["MANAGER", "AFFILIATE"])
    @UseGuards(RolesGuard)
    @Get("/:id")
    getUserById(@Param("id") id: string) {
        return this.usersService.getUserByIdToClient(id);
    }

    @Roles(["MANAGER", "AFFILIATE"])
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteUser(
        @Param("id") id: string,
        @Req() req: Request
    ) {
        return this.usersService.deleteUser(id, req);
    }
}
