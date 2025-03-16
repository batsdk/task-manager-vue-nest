import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.stratergy';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    try {
      const { username, email, password } = registerDto;

      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      const user = await this.usersService.create({
        username,
        email,
        password: hashedPassword,
      });

      // Generate token
      const payload: JwtPayload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation code
        throw new ConflictException('Username or email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.usersService.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}