import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRiviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constans';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateRiviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId') productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
