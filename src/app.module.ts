import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./shared/database/database.module";

const config = ConfigModule.forRoot();
const modules = [DatabaseModule];

@Module({
  imports: [config, ...modules],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
