import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { URIs } from 'src/constants';
import { AuthService } from './auth.service';
import { FBGuard } from './guards/facebook.guard';
import { GoogleGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    const payload = { name: req.user.name, id: req.user.id };
    return this.authService.login(payload, req.user.email);
  }
  @Post('register')
  register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.authService.register({
      name: body.username,
      email: body.email,
      password: body.password,
    });
  }
  @Get('facebook')
  @UseGuards(FBGuard)
  fbLogin(@Req() req, @Res() res: Response) {
    return res.redirect(
      `${URIs.clientLoginEndPoint}?token=${req.user.access_token}`,
    );
  }
  @Get('google')
  @UseGuards(GoogleGuard)
  goLogin(@Req() req, @Res() res: Response) {
    return res.redirect(
      `${URIs.clientLoginEndPoint}?token=${req.user.access_token}`,
    );
  }

  // @Get('github')
  // @UseGuards(GHGuard)
  // GhLogin(@Req() req, @Res() res: Response) {
  //   return res.redirect(
  //     `${URIs.clientLoginEndPoint}?token=${req.user.access_token}`,
  //   );
  // }
}
