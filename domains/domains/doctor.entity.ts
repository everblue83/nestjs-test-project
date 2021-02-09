import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, BaseEntity,
} from "typeorm";

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
}
