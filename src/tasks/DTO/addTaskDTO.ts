import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class addTaskDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La description doit être au minimum de 6 caractères',
  })
  public desc: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['done', 'todo', 'inprogress'])
  public statut: string;

  @IsNumber()
  @IsPositive()
  public year: number;
}
