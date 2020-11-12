import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatus1605176743675 implements MigrationInterface {
    name = 'AddStatus1605176743675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "type" SET DEFAULT 10`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 10`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 10`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "type" SET DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
