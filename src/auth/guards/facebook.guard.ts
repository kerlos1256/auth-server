import { AuthGuard } from '@nestjs/passport';

export class FBGuard extends AuthGuard('facebook') {}
