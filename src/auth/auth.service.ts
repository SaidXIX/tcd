import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  //RGISTRATION
  async register(dto: AuthRegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExists) {
      throw new ForbiddenException('User already exists');
    } else {
      const hashedPassword = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          familyName: dto.familyName,
          role: dto.role,
          email: dto.email,
          password: hashedPassword,
        },
      });

      return this.signTokens(user.id, user.role, user.email);
    }
  }

  //LOGIN
  async login(dto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    const pwdCorrect = await argon.verify(user.password, dto.password);

    if (!pwdCorrect) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return this.signTokens(user.id, user.role, user.email);
  }

  //SIGN TOKENS
  async signTokens(userId: string, role: string, email: string) {
    const payload = { sub: userId, role, email };
    const secret = this.configService.get<string>('JWT_SECRET');

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const hashedRefreshToken = await argon.hash(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRefreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  //REFRESH TOKENS
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return this.signTokens(user.id, user.role, user.email);
  }

  //LOGOUT
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });
  }
}
