/*import {Entity,PrimaryGeneratedColumn, Column,CreateDateColumn,BeforeInsert,} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 150, unique: true })
  uniqueId: string;

  @CreateDateColumn({ type: 'timestamp' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @BeforeInsert()
  generateUUID() {
    this.uniqueId = uuidv4();
  }
}
*/

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exam } from '../exams/exam.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  uniqueId: string;

  @CreateDateColumn({ type: 'timestamp' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @OneToMany(() => Exam, (exam) => exam.teacher)
  exams: Exam[];

  @BeforeInsert()
  generateUUID() {
    this.uniqueId = uuidv4();
  }
}
