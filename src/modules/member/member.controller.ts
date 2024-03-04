import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe
} from "@nestjs/common";
import { MemberService } from "./member.service";

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(":id")
  async getMember(@Param("id", new ParseIntPipe()) id: number) {
    const member = await this.memberService.getMember({ id });
    if (!member) throw new HttpException("Member not found", 404);
    return member;
  }
}
