import { Injectable } from "@nestjs/common";
import { PrismaClient, PrismaMember } from "@prisma/client";
import { Member } from "../../modules/member/member.model";
import { IMember } from "../../modules/member/member.interface";
import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

@Injectable()
export class PrismaService extends PrismaClient {}

@Injectable()
export class DatabaseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMember(data: Partial<IMember>): Promise<Member | null> {
    return this.prismaService.prismaMember
      .findFirst({ where: data })
      .then((member) => {
        if (!member) return null;
        return DatabaseService.initMember(member);
      });
  }

  private static initMember(member: PrismaMember): Member {
    const memberData: IMember = {
      ...member,
      gender: Gender[member.gender],
      role: Role[member.role]
    };
    return new Member(memberData);
  }
}
