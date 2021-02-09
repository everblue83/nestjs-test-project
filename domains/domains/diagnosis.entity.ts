import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity,
} from "typeorm";

@Entity()
export class Diagnosis extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int" })
    userId: number;

    @Column({ type: "varchar", length: 1, default: "N", nullable: false })
    status: string;

    @Column({ type: "varchar", length: 200, nullable: false })
    symptom: string;

    @Column({type: "int", default: 0 })
    doctorId: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
