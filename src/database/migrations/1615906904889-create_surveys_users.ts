import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSurveysUsers1615906904889 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'surveys_users',
			columns: [
				{
					name: 'id',
					type: 'varchar',
					isPrimary: true
				},
				{
					name: 'user_id',
					type: 'varchar',
				},
				{
					name: 'survey_id',
					type: 'varchar',
				},
				{
					name: 'value',
					type: 'integer',
					isNullable: true
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},
			],
			foreignKeys: [
				{
					name: 'fk_user',
					referencedTableName: 'users',
					referencedColumnNames: ['id'],
					columnNames: ['user_id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				},
				{
					name: 'fk_survey',
					referencedTableName: 'surveys',
					referencedColumnNames: ['id'],
					columnNames: ['survey_id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE'
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('surveys_users');
	}

}
