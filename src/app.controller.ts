import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  addCat(@Body() createCatDto: CreateCatDto) {
    return this.appService.addCat(createCatDto);
  }

  @Get()
  getCats() {
    return this.appService.getCats();
  }

  @Delete(':id')
  removeCat(@Param('id') id: string) {
    return this.appService.removeCat(id);
  }
}
