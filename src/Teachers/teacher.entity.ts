import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,BeforeInsert,} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  uniqueId: string;

  @CreateDateColumn({ type: 'timestamp' })
  joiningDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'Unknown' })
  country: string;


  @BeforeInsert()
  generateUUID() {
    this.uniqueId = uuidv4();
  }
}
