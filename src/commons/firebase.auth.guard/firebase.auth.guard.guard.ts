// firebase-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    const [, token] = authorizationHeader.split(' ');

    return this.validateToken(token);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.firebaseAuthService.verifyIdToken(token);
      return true;
    } catch (error) {
      console.error('Error de autenticación:', error);
      return false;
    }
  }
}
