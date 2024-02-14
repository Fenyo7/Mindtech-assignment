import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { PokemonModule } from './pokemon/pokemon.module';
import { Pokemon } from './pokemon/pokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'mindtech_assignment',
    entities: [User, Pokemon],
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
