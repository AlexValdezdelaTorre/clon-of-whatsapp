import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Online {
    on = 'on',
    off = 'off',
}

@Entity()
export class Contacts extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        length: 100,
        nullable: true,
    })
    name: string;

    @Column('varchar', {
        length: 100,
        nullable: true,
    })
    surname: string;

    @Column('varchar', {
        nullable: false,
        length: 150,
        unique: true,
    })
    email: string;

    @Column('varchar', {
        nullable: false,
        length: 20,
        unique: true,
    })
    cellphone: string;

    @Column('enum', {
        enum: Online,
        default: Online.off,
    })
    online: Online;
}
