import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; // Import your main app module

describe('Cats API (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Use the real AppModule
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdCatId: string; // To store the cat ID for later tests

  it('should add a cat', async () => {
    const newCat = { name: 'Tom', age: 3 };

    const response = await request(app.getHttpServer())
      .post('/cats')
      .send(newCat)
      .expect(HttpStatus.CREATED);

    interface NewCatResponse {
      newCat: {
        id: string;
        name: string;
        age: number;
      };
    }

    const responseBody = response.body as NewCatResponse;
    const createdCat = responseBody?.newCat;

    expect(createdCat).toHaveProperty('id');
    createdCatId = createdCat?.id; // Save the ID for future tests
  });

  it('should get all cats', async () => {
    const response = await request(app.getHttpServer())
      .get('/cats')
      .expect(HttpStatus.OK);

    interface GetAllCatsResponse {
      data: Array<{ id: string; name: string; age: number }>;
    }

    const responseBody: GetAllCatsResponse =
      response.body as GetAllCatsResponse;

    expect(Array.isArray(responseBody?.data)).toBe(true);
  });

  it('should remove a cat by ID', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/cats/${createdCatId}`)
      .expect(HttpStatus.OK);

    interface RemoveCatResponse {
      removedCat: {
        id: string;
      };
    }

    const responseBody: RemoveCatResponse = response.body as RemoveCatResponse;
    expect(responseBody.removedCat).toHaveProperty('id', createdCatId);
  });

  it('should return an error if cat ID is not found', async () => {
    console.log('🚀 ~ it ~ createdCatId:', createdCatId);
    const response = await request(app.getHttpServer())
      .delete(`/cats/${createdCatId}`) // Deleting again (should fail)
      .expect(HttpStatus.NOT_FOUND);

    interface ErrorResponse {
      message: string;
    }

    const responseBody: ErrorResponse = response.body as ErrorResponse;
    console.log('🚀 ~ it ~ responseBody:', responseBody);
    expect(responseBody.message).toBe('Cat not found with the given ID!');
  });
});
