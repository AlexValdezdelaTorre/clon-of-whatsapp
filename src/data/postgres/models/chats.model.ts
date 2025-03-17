import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chats extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,
    })
    content: string;

    @Column('boolean', {
        
        default: false,
    })
    status: Boolean;
}
