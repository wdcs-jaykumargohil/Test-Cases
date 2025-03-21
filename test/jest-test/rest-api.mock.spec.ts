import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(appService).toBeDefined();
  });

  it('should add a cat', () => {
    const newCat = { name: 'Tom', age: 3 };
    jest.spyOn(appService, 'addCat').mockImplementation(() => ({
      statusCode: HttpStatus.CREATED,
      message: 'Cat added successfully!',
      newCat: { ...newCat, id: '1' },
    }));
    expect(appController.addCat(newCat)).toEqual({
      statusCode: HttpStatus.CREATED,
      message: 'Cat added successfully!',
      newCat: { ...newCat, id: '1' },
    });
  });

  it('should get all cats', () => {
    const cats = [{ id: '1', name: 'Whiskers', age: 2 }];
    jest
      .spyOn(appService, 'getCats')
      .mockImplementation(() => ({ statusCode: HttpStatus.OK, data: cats }));
    expect(appController.getCats()).toEqual({
      statusCode: HttpStatus.OK,
      data: cats,
    });
  });

  it('should remove a cat by ID', () => {
    const removedCat = { id: '1', name: 'Whiskers', age: 2 };
    jest.spyOn(appService, 'removeCat').mockImplementation(() => ({
      statusCode: HttpStatus.OK,
      message: 'Cat removed successfully!',
      removedCat: { ...removedCat },
    }));
    expect(appController.removeCat('1')).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Cat removed successfully!',
      removedCat,
    });
  });

  it('should return an error if cat ID not found', () => {
    jest.spyOn(appService, 'removeCat').mockImplementation(() => {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cat not found with the given ID!',
        },
        HttpStatus.NOT_FOUND,
      );
    });

    try {
      appController.removeCat('999');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    }
  });
});
