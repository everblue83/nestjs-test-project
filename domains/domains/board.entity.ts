import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity, ManyToOne,
} from "typeorm";
import {User} from "./user.entity";
import {Doctor} from "./doctor.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int" })
    userId: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 400, nullable: false })
    content: string;

    @Column({type: "int", nullable: true })
    doctorId: number;

    @Column({ type: "varchar", length: 400, nullable: true})
    reply: string;

    @Column({ type: "date", nullable: true})
    repliedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // User(1) <-> Board(*)
    @ManyToOne(
        (type) => User,
        (user) => user.id
    )
    user!: User;

    // Doctor(1) <-> Board(*)
    @ManyToOne(
        (type) => Doctor,
        (doctor) => doctor.id
    )
    doctor!: Doctor;
}
