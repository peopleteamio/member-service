import { Gender } from "../../shared/enums/gender.enum";
import { Role } from "../../shared/enums/role.enum";
import { Member } from "./member.model";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("MemberController", () => {
  let memberController: MemberController;
  let memberService: jest.Mocked<MemberService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useFactory: () => ({
            getMember: jest.fn()
          })
        }
      ]
    }).compile();

    memberController = module.get<MemberController>(MemberController);
    memberService = module.get(MemberService) as jest.Mocked<MemberService>;
  });

  it("should be defined", () => {
    expect(memberController).toBeDefined();
  });

  it("should mock MemberService", async () => {
    expect(memberService).toBeDefined();
  });

  describe("getMember", () => {
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
      memberService.getMember.mockResolvedValue(mockResult);

      const result = await memberController.getMember(1);

      expect(result).toEqual(mockResult);
      expect(memberService.getMember).toHaveBeenCalledWith({ id: 1 });
    });

    it("should throw an error if member not found", async () => {
      const mockResult = null;
      memberService.getMember.mockResolvedValue(mockResult);

      await expect(memberController.getMember(1)).rejects.toThrow(
        "Member not found"
      );
    });
  });
});
