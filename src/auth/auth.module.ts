import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "default_secret_key",
            signOptions: { expiresIn: "1h" },
            global: true, 
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
