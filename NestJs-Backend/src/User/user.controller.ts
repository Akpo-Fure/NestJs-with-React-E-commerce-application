import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AdminGuard, JwtGuard } from '../Auth/Guards/index';
import { UserService } from './user.service';
import { UpdateProfileDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Request() req) {
    return this.userService.getUser(req);
  }

  @Patch()
  updateUserUprofile(@Request() req, @Body() dto: UpdateProfileDTO) {
    const id = req.user.id;
    return this.userService.updateUserProfile(id, dto);
  }

  @UseGuards(AdminGuard)
  @Get('/users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
