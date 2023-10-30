import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) throw new UnauthorizedException();
    if (request.user.isAdmin === false) {
      throw new UnauthorizedException({
        message: 'Only admins can access this route',
      });
    }
    return true;
  }
}
