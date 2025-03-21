## 📄 Go => **[`README.md`](./README.md)**

# Frontend Test Cases with JEST (Default)

This guide will help you set up and run backend test cases using simple jest.

---

## 📌 Dependencies

### 1️⃣ Update `package.json`

Modify the `scripts` section in `package.json` to add a test command:

```ts
"scripts": {
  ...
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
  ...
}
```

---

### 📝 Writing a Sample Frontend Test Case

Create a test file at `./test/rest-api.functional.spec.ts` and add the following code:

_Note: Calls actual service methods (modifies real data)._

```ts
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
```

Create a test file at `./test/rest-api.mock.spec.ts` and add the following code:

_Note: Uses `jest.spyOn().mockImplementation()` (no real data change)._

```ts
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
        jest.spyOn(appService, 'getCats').mockImplementation(() => ({ statusCode: HttpStatus.OK, data: cats }));
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
```

---

### 🚀 Running the Test Case

Run the test using either of the following commands:

```sh
yarn run test
```

or

```sh
npm run test
```
