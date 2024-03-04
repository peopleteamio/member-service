import { Injectable } from "@nestjs/common";
import { IMember } from "./member.interface";
import { DatabaseService } from "../../shared/database/database.service";
import { Member } from "./member.model";

@Injectable()
export class MemberService {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getMember(data: Partial<IMember>): Promise<Member | null> {
    return this.databaseService.getMember(data);
  }
}
