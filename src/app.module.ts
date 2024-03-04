import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";

const config = ConfigModule.forRoot();

@Module({
  imports: [config],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
