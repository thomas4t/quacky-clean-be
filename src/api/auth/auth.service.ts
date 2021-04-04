import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { user } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

export type ValidatedUserType = Omit<user, "password">;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<ValidatedUserType | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: ValidatedUserType) {
    const payload = { username: user.login, sub: user.ID_User };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
