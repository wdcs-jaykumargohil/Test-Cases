import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class AppService {
  private static cats = [{ id: '1', name: 'Whiskers', age: 2 }];

  getCats() {
    return { statusCode: HttpStatus.OK, data: AppService.cats };
  }

  addCat(createCatDto: CreateCatDto) {
    const newCat = {
      id: (AppService.cats.length + 1).toString(),
      ...createCatDto,
    };
    AppService.cats.push(newCat);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cat added successfully!',
      newCat,
    };
  }

  removeCat(id: string) {
    const index = AppService.cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cat not found with the given ID!',
      });
    }
    const removedCat = AppService.cats.splice(index, 1)[0];
    return {
      statusCode: HttpStatus.OK,
      message: 'Cat removed successfully!',
      removedCat,
    };
  }
}
