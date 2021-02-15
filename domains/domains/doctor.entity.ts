import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {Board} from "./board.entity";

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: false, unique: true }) userid: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @Column({ type: 'varchar', nullable: false }) password: string;
  @Column({ type: 'varchar', nullable: false }) email: string;
  @Column({ type: 'varchar', nullable: false }) category: string;
  @CreateDateColumn() createdAt?: Date;
  @CreateDateColumn() updatedAt?: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Doctor(1) <-> Board(*)
  @OneToMany(
      (type) => Board,
      (board) => board.doctorId,
  )
  board!: Board[];
}
