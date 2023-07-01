import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {

    constructor(description: string) {
        this.description = description;
    }

    @PrimaryGeneratedColumn()
    taskId: number;

    @Column()
    description: string;

    @Column({ default: false })
    isDone: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
