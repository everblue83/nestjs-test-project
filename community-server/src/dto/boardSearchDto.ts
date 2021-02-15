import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class BoardSearchDto {
  @ApiModelPropertyOptional()
  name: string;

  @ApiModelPropertyOptional()
  title: string;
}
