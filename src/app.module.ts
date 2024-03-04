import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./shared/database/database.module";
import { MemberModule } from "./modules/member/member.module";

const config = ConfigModule.forRoot();
const modules = [DatabaseModule, MemberModule];

@Module({
  imports: [config, ...modules],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
