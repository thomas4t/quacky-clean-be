import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Prisma, user } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma.service";

export type ValidatedUserType = Omit<user, "password">;

//'login', 'password', 'first_name', 'last_name', 'test@email.com', '645665452', 'Stromová', '52', 50511, 'Město nevim', @return
// was too lazy to hack it from Prisma
export type CreateNewUserType = {
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_name: string;
  house_number: string;
  zip_code: number;
  city: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
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

  async register(
    user: CreateNewUserType
  ): Promise<{ didOkay: boolean; message: string }> {
    const userData = {
      login: user.login,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.password,
      phone: user.phone,
    };

    const existingUser = await this.prisma.user.findFirst({
      where: { login: { equals: user.login } },
    });

    // First early return
    if (existingUser) {
      return { didOkay: false, message: "Username already taken" };
    }

    const existingAddress = await this.prisma.address.findFirst({
      where: {
        street_name: user.street_name,
        street_number: user.house_number,
      },
    });

    if (existingAddress) {
      await this.prisma.user.create({
        data: {
          ...userData,
          address: {
            connect: { ID_Address: existingAddress.ID_Address },
          },
        },
      });
    } else {
      await this.prisma.user.create({
        data: {
          ...userData,
          address: {
            create: {
              street_name: user.street_name,
              street_number: user.house_number,
              zip_code: {
                connectOrCreate: {
                  where: { ID_ZIP: user.zip_code },
                  create: { city: user.city, ID_ZIP: user.zip_code },
                },
              },
            },
          },
        },
      });
    }

    return { didOkay: true, message: "Successfuly added new account" };
  }
}
