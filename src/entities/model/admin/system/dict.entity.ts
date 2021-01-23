import { PublicEntity } from "src/entities/public.entity";
import { BeforeInsert, Column, Entity } from "typeorm";

@Entity('dict')
export class DictEntity extends PublicEntity {
	@Column({
		type: 'varchar',
		nullable: false,
		length: 50,
		name: 'parent_code',
		comment: '父编码'
	})
	parentCode: string

	@Column({
		type: 'varchar',
		nullable: false,
		length: 70,
		name: 'code',
		comment: '当前数据编码'
	})
	code: string

	@Column({
		type: 'varchar',
		nullable: false,
		length: 120,
		name: 'uuid',
		comment: 'uuid 组合父编码与子编码'
	})
	uuid: string

	@Column('varchar', {
		nullable: false,
		length: 50,
		name: 'label',
		comment: 'label描述值'
	})
	label: string;

	@Column('varchar', {
		nullable: false,
		length: 50,
		name: 'value',
		comment: '描述值对应的key'
	})
	value: string;

	@Column('varchar', {
		nullable: true,
		length: 150,
		name: 'description',
		comment: '描述'
	})
	description: string | null;

	@Column({
		type: 'varchar',
		nullable: false,
		length: 20,
		name: 'status',
		comment: '禁用 0/启用 1'
	})
	status: string

	// 设置uuid
	@BeforeInsert()
	getCode() {
		this.uuid = this.parentCode + this.uuid
	}
}