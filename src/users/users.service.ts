import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.code';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { logger } from 'src/main';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>

  ) { }

  /**
   * Creates a new user
   * @param createUserDto 
   * @param req 
   * @returns 
   */
  async create(createUserDto: CreateUserDto, req: any): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      //hash the password in the dto sent
      await bcrypt.hash(newUser.passwordHash, 10).then((hash: string) => {
        newUser.passwordHash = hash
      })

      const user = await this.userRepository.save(newUser);

      return user;

    } catch (error) {
      logger.error(error.message, {time: new Date(), host: req.hostname, request_method: req.method, endpoint: req.url, agent: req.headers['user-agent'] });
      logger.debug(error.stack, {time: new Date(), host: req.hostname, request_method: req.method, endpont: req.url, agent: req.headers['user-agent'] })
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with user creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with user creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }

    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      if (updateUserDto.passwordHash != '') {
        await bcrypt.hash(updateUserDto.passwordHash, 10).then((hash: string) => {
          updateUserDto.passwordHash = hash
        })
      }
        return await this.userRepository.update(id, { ...updateUserDto })

    }catch (error) {
        if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: `There was a problem with user creation: ${error.message}`
          }, HttpStatus.BAD_REQUEST)
        } else {
          throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `There was a problem with user creation: ${error.message}`
          }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
  }

    async findAll(): Promise < [User[], number] > {
      try{
        return await this.userRepository.findAndCount({
          cache: {
            id: "users",
            milliseconds: 10000
          }
        });

      } catch(error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem accessing user data: ${error.meessage}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async findAllWithOptions(findOptions: string): Promise < [User[], number] > {
      try{
        return await this.userRepository.findAndCount(JSON.parse(findOptions))

      } catch(error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem accessing user data: ${error.meessage}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing user data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise < DeleteResult > {
    try{
      return await this.userRepository.delete(id);
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing user data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /** Relationships */
  async addRoleById(userId: number, roleId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .add(roleId)
    } catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem adding the role with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addRolesById(userId: number, roleIds: number[]): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .add(roleIds)
    } catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem adding roles with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeRoleById(userId: number, roleId: number): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .remove(roleId)
    } catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem removing the role with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeRolesById(userId: number, roleIds: number[]): Promise<void>{
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "roles")
      .of(userId)
      .remove(roleIds)
    } catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem removing roles with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async setUserProfileById(userId: number, userProfileId: number): Promise<void> {
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "userProfile")
      .of(userId)
      .set(userProfileId)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user-profile with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async unsetUserProfileById(userId: number): Promise<void> {
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "userProfile")
      .of(userId)
      .set(null)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem usettinng user-profile with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async setEmployeeById(userId: number, employeeId: number): Promise<void> {
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "employee")
      .of(userId)
      .set(employeeId)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting employee with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async unsetEmployeeById(userId: number): Promise<void> {
    try{
      return await this.userRepository.createQueryBuilder()
      .relation(User, "employee")
      .of(userId)
      .set(null)
    }catch(error){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting employee with user id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
