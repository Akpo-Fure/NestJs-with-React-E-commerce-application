import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtGuard } from 'src/Auth/Guards';
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
}
