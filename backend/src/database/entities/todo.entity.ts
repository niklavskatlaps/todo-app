import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoListEntity } from "./todo-list.entity";

@Entity({ name: "todo" })
export class TodoEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      title!: string;

    @Column({ type: "varchar", nullable: true })
      description!: string | null;

    @Column({ default: false })
      isDone!: boolean;

    @ManyToOne(() => TodoListEntity, (list) => list.todos)
      todoList!: TodoListEntity;
}
