import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateRivewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';
import { ReviewModule } from './review.module';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) { }

	async create(dto: CreateRivewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel.find({ pdroductId: Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ pdroductId: Types.ObjectId(productId) }).exec();
	}
}
