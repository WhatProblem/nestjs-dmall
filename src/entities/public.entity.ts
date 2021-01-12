import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class PublicEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
		type: 'int',
		name: 'id',
		comment: '公共主键id'
	})
	id: number

	@Exclude()
	@Column('tinyint', {
		nullable: false,
		default: ()=>0,
		name: 'is_del',
		comment: '是否删除，-1 表示正常 0 表示正常'
	})
	isDel: number

	@CreateDateColumn({
		type: 'timestamp',
		nullable: false,
		name: 'create_time',
		comment: '创建时间'
	})
	createTime: Date

	@UpdateDateColumn({
		type: 'timestamp',
		nullable: false,
		name: 'update_time',
		comment: '更新时间'
	})
	updateTime: Date
}