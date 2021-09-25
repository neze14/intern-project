import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.code';


@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>
    
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try{
      const newEmployee = this.employeeRepository.create(createEmployeeDto);

      const employee = await this.employeeRepository.save(newEmployee);

      return employee;
      
    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateResult> {
    try{ 
      return await this.employeeRepository.update(id, { ...updateEmployeeDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with employee creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findAll(): Promise <Employee[]> {
    try{
      return await this.employeeRepository.find();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing employee data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      return await this.employeeRepository.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing employee data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise < DeleteResult > {
    try{
      return await this.employeeRepository.delete(id);
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing user data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}