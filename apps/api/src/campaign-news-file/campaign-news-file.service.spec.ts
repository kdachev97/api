import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { CampaignNewsFileService } from './campaign-news-file.service'
import { S3Service } from '../s3/s3.service'
import { PersonService } from '../person/person.service'
import { MockPrismaService } from '../prisma/prisma-client.mock'
import { NotificationsProviderInterface } from '../notifications/providers/notifications.interface.providers'
import { SendGridNotificationsProvider } from '../notifications/providers/notifications.sendgrid.provider'
import { MarketingNotificationsModule } from '../notifications/notifications.module'
import { MarketingNotificationsService } from '../notifications/notifications.service'
import { EmailService } from '../email/email.service'
import { TemplateService } from '../email/template.service'

describe('CampaignFileService', () => {
  let service: CampaignNewsFileService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MarketingNotificationsModule],
      providers: [
        CampaignNewsFileService,
        MockPrismaService,
        S3Service,
        PersonService,
        EmailService,
        TemplateService,
        ConfigService,
        {
          // Use the interface as token
          provide: NotificationsProviderInterface,
          // But actually provide the service that implements the interface
          useClass: SendGridNotificationsProvider,
        },
        MarketingNotificationsService,
      ],
    }).compile()

    service = module.get<CampaignNewsFileService>(CampaignNewsFileService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
