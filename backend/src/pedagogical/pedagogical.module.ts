import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedagogicalService } from './pedagogical.service';
import { PedagogicalController } from './pedagogical.controller';
import { SchoolClass } from './entities/class.entity';
import { Grade } from './entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass, Grade])],
  controllers: [PedagogicalController],
  providers: [PedagogicalService],
  exports: [PedagogicalService],
})
export class PedagogicalModule {}
