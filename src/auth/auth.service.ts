import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({where: { email: loginDto.email }});

        if (!user || (await bcrypt.compare(loginDto.password, user.password)) === false) {
            throw new Error('Invalid email or password');
        }

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new ConflictException('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
        });
        await this.userRepository.save(user);

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
        
    }
}
