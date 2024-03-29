import { Exclude, Expose } from "class-transformer";
import { Gender } from "../../shared/enums/gender.enum";
import { Role } from "../../shared/enums/role.enum";
import { IMember } from "./member.interface";

export class Member implements IMember {
  @Exclude()
  id!: number;

  @Expose({ name: "public_id" })
  publicId!: number;

  name!: string;

  nickname!: string;

  @Expose({ name: "birth_date" })
  birthDate!: Date;

  gender!: Gender;

  role!: Role;

  constructor(data: IMember) {
    Object.assign(this, data);
  }
}
