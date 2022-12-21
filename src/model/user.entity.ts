import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @Column({ default: true })
  isActive: boolean;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
constructor(id: string, name: string, pass: string, email:string, username:string) {
    this.id = id;
    this.name = name;
    this.password = pass;
    this.email = email;
    this.username = username;
  }
}