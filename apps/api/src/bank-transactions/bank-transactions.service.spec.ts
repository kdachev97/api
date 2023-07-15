import { STRIPE_CLIENT_TOKEN } from '@golevelup/nestjs-stripe'
import { HttpModule } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { CampaignService } from '../campaign/campaign.service'
import { DonationsService } from '../donations/donations.service'
import { ExportService } from '../export/export.service'
import { PersonService } from '../person/person.service'
import { MockPrismaService } from '../prisma/prisma-client.mock'
import { NotificationModule } from '../sockets/notifications/notification.module'
import { VaultService } from '../vault/vault.service'
import { BankTransactionsService } from './bank-transactions.service'
import { IrisTasks } from '../tasks/bank-import/import-transactions.task'
import { SchedulerRegistry } from '@nestjs/schedule'
import { EmailService } from '../email/email.service'
import { TemplateService } from '../email/template.service'

const stripeMock = {
  checkout: { sessions: { create: jest.fn() } },
}

// Mock the IrisTask check for environment variables
jest
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  .spyOn(IrisTasks.prototype as any, 'checkForRequiredVariables')
  .mockImplementation(() => true)

describe('BankTransactionsService', () => {
  let service: BankTransactionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, NotificationModule],
      providers: [
        BankTransactionsService,
        MockPrismaService,
        ExportService,
        DonationsService,
        {
          provide: STRIPE_CLIENT_TOKEN,
          useValue: stripeMock,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        CampaignService,
        VaultService,
        PersonService,
        IrisTasks,
        SchedulerRegistry,
        EmailService,
        TemplateService,
      ],
    }).compile()

    service = module.get<BankTransactionsService>(BankTransactionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
