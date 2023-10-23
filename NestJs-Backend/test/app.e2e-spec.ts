import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import * as argon from 'argon2';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SigninDto, SignupDto } from 'src/auth/Dto';

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
    const hashedPassword = await argon.hash('123456');
    await prisma.user.create({
      data: {
        name: 'admin tester',
        email: 'admintester@email.com',
        password: hashedPassword,
        isAdmin: true,
      },
    });
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
          .expectStatus(201);
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

    describe('login', () => {
      const dto: SigninDto = {
        email: 'tester@email.com',
        password: '123456',
      };
      it('Should login as user', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .stores('userToken', 'token')
          .expectStatus(200);
      });

      it('Should log in as an admin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'admintester@email.com', password: '123456' })
          .stores('adminToken', 'token')
          .expectStatus(200);
      });

      it('Should fail if invalid password', () => {
        dto.password = '12345';
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(401);
      });

      it('Should fail if email does not exist', () => {
        dto.password = '123456';
        dto.email = 'faketester@email.com';
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(401);
      });
    });
  });

  describe('Users', () => {
    describe('Get User Profile', () => {
      it('Should get user profile', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' })
          .expectStatus(200);
      });

      it('Should get admin user profile', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders({ Authorization: 'Bearer $S{adminToken}' })
          .expectStatus(200);
      });

      it('Should fail if no token', () => {
        return pactum.spec().get('/user').expectStatus(401);
      });
    });

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
