import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registster(@Body() body: CreateAuthDto) {
    return this.authService.register(body)
  }

  @Post('login')
  getData(@Body() body: CreateAuthDto) {
    return this.authService.login(body)
  }
  
}
