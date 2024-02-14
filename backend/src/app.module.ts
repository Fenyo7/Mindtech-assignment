import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'mindtech_assignment',
    entities: [User],
    synchronize: true,
  }),
    AuthModule,
    UsersModule,
    PokemonModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
