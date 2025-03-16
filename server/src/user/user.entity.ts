import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

import { Task } from "src/tasks/tasks.entity";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(() => Task, task => task.user, {cascade: true} )
  tasks: Task[]

}