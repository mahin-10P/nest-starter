import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
      
  async createUser(createUserDto) {
    const user = await this.userRepository.findOne({ where: { email:createUserDto.email } });
    if (user) {
      throw new HttpException('Email already exist', HttpStatus.FOUND);    
  }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
      
  findUserById(id) {
    return this.userRepository.findOneBy({id:id});
  }

  getUsers() {
    return this.userRepository.find();
  }

  deleteUserById(id: number){
    return  this.userRepository.delete(id);
  }

  async editUser(userObj, user){
    const updatedUser = await this.userRepository.update(user.id, userObj);
    return  updatedUser;
  }

  async loginUser(userObj){
    let user = await this.userRepository.findOne({ where: { email:userObj.email } });
    if(user){
      const validatePassword = await this.validatePassword(userObj.password, user.password);
      if(validatePassword){
        delete user.password;
        return user;  
      }else{
        throw new HttpException('Email or password incorrect', HttpStatus.NOT_FOUND);
      }
            
    }else{
      throw new HttpException('Email or password incorrect', HttpStatus.NOT_FOUND);
    }
    
  }

  async validatePassword(password: string, savePassword:string): Promise<boolean> {
    return await bcrypt.compareSync(password, savePassword);
  }
}