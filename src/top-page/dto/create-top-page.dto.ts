import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

class TopPageAdvantage {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

class HhData {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstLevelCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => HhData)
	hh?: HhData;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantage)
	advantages: TopPageAdvantage[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}