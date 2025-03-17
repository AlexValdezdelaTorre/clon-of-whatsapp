import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
	ACTIVE = 'ACTIVE',
	DELETED = 'DELETED',
}

@Entity()
export class Users extends BaseEntity {
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

	@Column('varchar', {
		nullable: true,
		length: 255,
	})
	password: string;

	@Column('enum', {
		enum: Status,
		default: Status.ACTIVE,
	})
	status: Status;
}
