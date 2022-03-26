import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecurringDonationService } from './recurring-donation.service';
import { CreateRecurringDonationDto } from './dto/create-recurring-donation.dto';
import { UpdateRecurringDonationDto } from './dto/update-recurring-donation.dto';

@Controller('recurring-donation')
export class RecurringDonationController {
  constructor(private readonly recurringDonationService: RecurringDonationService) {}

  @Post()
  create(@Body() createRecurringDonationDto: CreateRecurringDonationDto) {
    return this.recurringDonationService.create(createRecurringDonationDto);
  }

  @Get()
  findAll() {
    return this.recurringDonationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringDonationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecurringDonationDto: UpdateRecurringDonationDto) {
    return this.recurringDonationService.update(+id, updateRecurringDonationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringDonationService.remove(+id);
  }
}
