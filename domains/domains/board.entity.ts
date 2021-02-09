import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity,
} from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int", nullable: false })
    userId: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 400, nullable: false })
    content: string;

    @Column({type: "int", nullable: false })
    doctorId: number;

    @Column({ type: "varchar", length: 400})
    reply: string;

    @Column({ type: "date"})
    repliedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
