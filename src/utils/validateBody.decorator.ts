import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface DecoData {
  dto: any;
  exclude?: string[];
}

export const validateBody = createParamDecorator(
  async (data: DecoData, context: ExecutionContext) => {
    if (!data.dto) return 'a dto class have to be passed';
    const req = context.switchToHttp().getRequest();
    const dto = new data.dto();

    const validated = {};
    const entries = Object.entries(req.body);
    for (const entry of entries) {
      if (dto[entry[0]] === null) {
        if (data.exclude) {
          if (!data.exclude.includes(entry[0])) {
            if (entry[1] !== '') {
              validated[entry[0]] = entry[1];
            }
          }
        } else {
          if (entry[1] !== '') {
            validated[entry[0]] = entry[1];
          }
        }
      }
    }
    return validated;
  },
);
