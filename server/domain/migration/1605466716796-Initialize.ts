import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1605466716796 implements MigrationInterface {
    name = 'Initialize1605466716796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_history" ("task_history_id" SERIAL NOT NULL, "time_done" TIMESTAMP NOT NULL, "duration" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task_id" integer NOT NULL, CONSTRAINT "PK_a697460e09a3275686c5a5c591d" PRIMARY KEY ("task_history_id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("task_id" SERIAL NOT NULL, "name" character varying NOT NULL, "time_start" TIMESTAMP NOT NULL, "time_end" TIMESTAMP NOT NULL, "time_remain" bigint NOT NULL, "type" smallint NOT NULL DEFAULT 10, "status" smallint NOT NULL DEFAULT 10, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "parent_id" integer, CONSTRAINT "PK_721f914bb100703f201a77dd58f" PRIMARY KEY ("task_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" smallint NOT NULL DEFAULT 0, "status" smallint NOT NULL DEFAULT 10, "activation_token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" integer NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "parent_id" integer, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "task_history" ADD CONSTRAINT "FK_e733285140c013322a9ae1be644" FOREIGN KEY ("task_id") REFERENCES "task"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_cde1069d3c3c483430e8fed5306" FOREIGN KEY ("owner_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5b12d07794e1d6428696b35fd7e" FOREIGN KEY ("parent_id") REFERENCES "task"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_730c49ae7771b10f9b2f45cc9db" FOREIGN KEY ("owner_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743" FOREIGN KEY ("parent_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_1117b4fcb3cd4abb4383e1c2743"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_730c49ae7771b10f9b2f45cc9db"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5b12d07794e1d6428696b35fd7e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_cde1069d3c3c483430e8fed5306"`);
        await queryRunner.query(`ALTER TABLE "task_history" DROP CONSTRAINT "FK_e733285140c013322a9ae1be644"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "task_history"`);
    }

}
