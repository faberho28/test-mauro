import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonName: string;

  @Column()
  pokemonId: number;

  //Relación: muchos favoritos → un usuario
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE', // si se borra el usuario, se borran sus favoritos
  })
  user: User;
}
