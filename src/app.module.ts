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
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('MONGO_URI');

        return {
          uri,
        } satisfies MongooseModuleOptions;
      },
      inject: [ConfigService],
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
