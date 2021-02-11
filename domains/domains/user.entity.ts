import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, BaseEntity, BeforeInsert,
} from "typeorm";
import * as crypto from 'crypto';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column({ type: "varchar", length: 200, nullable: false })
  password: string;
  @CreateDateColumn()
  createdAt: Date;
}

export default User;