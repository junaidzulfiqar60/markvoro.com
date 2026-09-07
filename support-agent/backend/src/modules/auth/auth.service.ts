import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { SessionPayload } from "../../common/auth.types";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { email } });
    // Generic failure message on any mismatch — never reveal which part was wrong.
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const payload: SessionPayload = {
      sub: user.id,
      clientId: user.clientId,
      role: user.role,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload, { expiresIn: "7d" });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, clientId: user.clientId },
    };
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
