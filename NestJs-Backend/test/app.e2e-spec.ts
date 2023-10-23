import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignupDto } from 'src/auth/Dto';

describe('iCommerce e2e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(2000);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:2000');
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    describe('Signup', () => {
      const dto: SignupDto = {
        name: 'tester',
        password: '123456',
        email: 'tester@email.com',
      };
      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
      it('Should fail if no name', () => {
        delete dto.name;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('Should fail if no password', () => {
        dto.name = 'tester';
        delete dto.password;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('Should fail if no email', () => {
        delete dto.email;
        dto.password = '123456';
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
    });

    describe('login', () => {});
  });

  describe('Users', () => {
    describe('Get User Profile', () => {});

    describe('Update user Profile', () => {});

    describe('Get all users', () => {});
  });

  describe('Products', () => {
    describe('Get all products', () => {});

    describe('Create product', () => {});

    describe('Update products', () => {});

    describe('Delete products', () => {});

    describe('Get all products', () => {});
  });

  describe('Orders', () => {});
});
