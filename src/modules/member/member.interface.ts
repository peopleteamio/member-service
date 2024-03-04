import { Gender } from "../../shared/enums/gender.enum";
import { Role } from "../../shared/enums/role.enum";

export interface IMember {
  id: number;
  publicId: number;
  name: string;
  nickname: string;
  birthDate: Date;
  gender: Gender;
  role: Role;
}
