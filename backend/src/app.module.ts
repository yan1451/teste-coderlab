import { Module } from '@nestjs/common';
import { CategoryModule, ProductModule } from './modules';
import { PrismaService } from 'src/shared/';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
