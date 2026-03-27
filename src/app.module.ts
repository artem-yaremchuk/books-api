import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
