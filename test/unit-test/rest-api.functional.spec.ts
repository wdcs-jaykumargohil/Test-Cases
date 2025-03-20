import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../src/app.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a cat', () => {
    const newCat = { name: 'Tom', age: 3 };
    const result = service.addCat(newCat);
    expect(result.statusCode).toBe(HttpStatus.CREATED);
    expect(result.newCat).toHaveProperty('id');
  });

  it('should get all cats', () => {
    const result = service.getCats();
    expect(result.statusCode).toBe(HttpStatus.OK);
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should remove a cat by ID', () => {
    const existingCat = service.addCat({ name: 'Tom', age: 3 }).newCat; //4
    const result = service.removeCat(existingCat.id);
    expect(result.statusCode).toBe(HttpStatus.OK);
    expect(result.removedCat).toHaveProperty('id', existingCat.id);
  });

  it('should return an error if cat ID not found', () => {
    const existingCat = service.addCat({ name: 'Tom', age: 3 }).newCat; //10002. This is the ID of the cat that we will delete and then try to delete again to test this test case.
    service.removeCat(existingCat.id); // delete the cat first (this is the cat that we will delete)
    try {
      service.removeCat('999');
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    }
  });
});
