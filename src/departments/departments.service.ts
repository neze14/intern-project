// https://www.npmjs.com/package/winston

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import * as bcrypt from 'bcrypt';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/global/error.code';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department) private departmentRepository: Repository<Department>
    
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try{
      const newDepartment = this.departmentRepository.create(createDepartmentDto);

      // await bcrypt.hash(newDepartment.)

      const department = await this.departmentRepository.save(newDepartment);

      return department;
      
    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with department creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with department creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<UpdateResult> {
    try{ 
      return await this.departmentRepository.update(id, { ...updateDepartmentDto })

    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `There was a problem with department creation: ${error.message}`
        }, HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `There was a problem with department creation: ${error.message}`
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findAll(): Promise <Department[]> {
    try{
      return await this.departmentRepository.find();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing department data: ${error.message}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      return await this.departmentRepository.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing department data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise <DeleteResult> {
    try{
      return await this.departmentRepository.delete(id);
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem accessing department data: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**RELATIONSHIPS */
  async addEmployeeById(departmentId: number, employeeId: number): Promise<void> {
    try{ 
      return await this.departmentRepository.createQueryBuilder()
        .relation(Department, "employee")
        .of(departmentId)
        .add(employeeId)
    } catch (error) {
      throw new HttpException ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:`There was a problem adding the employee with department id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addEmployeesById(departmentId: number, employeeIds: number[]): Promise<void> {
    try{ 
      return await this.departmentRepository.createQueryBuilder()
        .relation(Department, "employees")
        .of(departmentId)
        .add(employeeIds)
    } catch (error) {
      throw new HttpException ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:`There was a problem adding employees with department id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeEmployeeById(departmentId: number, employeeId: number): Promise<void> {
    try{ 
      return await this.departmentRepository.createQueryBuilder()
        .relation(Department, "employee")
        .of(departmentId)
        .remove(employeeId)
    } catch (error) {
      throw new HttpException ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:`There was a problem removing the employee with department id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeEmployeesById(departmentId: number, employeeIds: number[]): Promise<void> {
    try{ 
      return await this.departmentRepository.createQueryBuilder()
        .relation(Department, "employees")
        .of(departmentId)
        .remove(employeeIds)
    } catch (error) {
      throw new HttpException ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:`There was a problem removing employees with department id: ${error.meessage}`
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
