import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EquipmentModule } from '../equipment/equipment.module';

@Module({
  imports: [forwardRef(() => EquipmentModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
