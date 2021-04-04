import { Injectable } from "@nestjs/common";
import { user as User, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.userWhereInput["login"]
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { login: userWhereUniqueInput },
    });
  }

  // async getUsers(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.userWhereUniqueInput;
  //   where?: Prisma.userWhereInput;
  //   orderBy?: Prisma.userOrderByInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  async createUser(data: Prisma.userCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.userWhereUniqueInput;
    data: Prisma.userUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
