import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async register(body: CreateAuthDto) {

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const userIsExists = await this.authRepository.findOneBy({ email: body.email });
      if (userIsExists) {
        console.log("User already exists!!");
        return {status: false}
      }

    const newUser = this.authRepository.create({
      ...body,
      password: hashedPassword
    });

    await this.authRepository.save(newUser);

    return { status: true }
  }

  async login(body: { email: string, password: string }) {

    const user = await this.authRepository.findOneBy({ email: body.email});
      if(!user) {
        console.log("User not found!!");
        return { status: false, msg: "User not found" }
      }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
      if(!isPasswordValid) {
        console.log("Invalid password!!");
        return { status: false, msg: "Invalid password"}
      }

    return { status: true }
  }
}

