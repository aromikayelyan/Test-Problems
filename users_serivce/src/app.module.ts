import { Module } from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize"
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users_model";




@Module({
    controllers:[],
    providers:[],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT),
          username: process.env.MYSQL_USER,
          password: String(process.env.MYSQL_PASSWORD),
          database: process.env.MYSQL_DB,
          models: [User],
          autoLoadModels: true,
          synchronize: true,
        }),
        UsersModule,
      ],
})
export class AppModule {}