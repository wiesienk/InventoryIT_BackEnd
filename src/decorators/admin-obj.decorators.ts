import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AdminObj = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().admin;
  },
);
