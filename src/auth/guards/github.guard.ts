import { AuthGuard } from '@nestjs/passport';

export class GHGuard extends AuthGuard('github') {}
