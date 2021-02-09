import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default User;