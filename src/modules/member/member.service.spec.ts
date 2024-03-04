import { Test, TestingModule } from "@nestjs/testing";
import { MemberService } from "./member.service";
import { DatabaseService } from "../../shared/database/database.service";
import { Member } from "./member.model";
import { Gender } from "../../shared/enums/gender.enum";
import { Role } from "../../shared/enums/role.enum";

jest.mock("../../shared/database/database.service");

describe("MemberService", () => {
  let memberService: MemberService;
  let databaseService: jest.Mocked<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: DatabaseService,
          useFactory: () => ({
            getMember: jest.fn()
          })
        }
      ]
    }).compile();

    memberService = module.get<MemberService>(MemberService);
    databaseService = module.get(
      DatabaseService
    ) as jest.Mocked<DatabaseService>;
  });

  it("should be defined", () => {
    expect(memberService).toBeDefined();
  });

  it("should mock DatabaseService", async () => {
    expect(databaseService).toBeDefined();
  });

  it("should return a member", async () => {
    const mockResult: Member = new Member({
      id: 1,
      publicId: 1,
      name: "John Doe",
      nickname: "JD",
      birthDate: new Date(),
      gender: Gender.MALE,
      role: Role.CREW
    });
    databaseService.getMember.mockResolvedValue(mockResult);

    const result = await memberService.getMember({ name: "John Doe" });

    expect(result).toEqual(mockResult);
    expect(databaseService.getMember).toHaveBeenCalledWith({
      name: "John Doe"
    });
  });

  it("should return null when member is not found", async () => {
    const mockResult = null;
    databaseService.getMember.mockResolvedValue(mockResult);

    const result = await memberService.getMember({ name: "John Doe" });

    expect(result).toBeNull();
    expect(databaseService.getMember).toHaveBeenCalledWith({
      name: "John Doe"
    });
  });
});
