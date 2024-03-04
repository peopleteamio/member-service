import { Global, Module } from "@nestjs/common";
import { DatabaseService, PrismaService } from "./database.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService, PrismaService],
  exports: [DatabaseService, PrismaService]
})
export class DatabaseModule {}
