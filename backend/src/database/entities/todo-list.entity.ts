import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./todo.entity";

@Entity({ name: "todo_list" })
export class TodoListEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      title!: string;

    @OneToMany(() => TodoEntity, (todo) => todo.todoList, { eager: true })
      todos!: TodoEntity[];
}
