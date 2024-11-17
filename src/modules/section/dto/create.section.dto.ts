import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSectionDto {
    @IsNotEmpty({ message: 'section name must not be empty' })
    @IsString({ message: 'section name must be a string' })
    @Length(1, 50, {
        message: 'section name must be between 1 and 50 characters',
    })
    name: string;
}
