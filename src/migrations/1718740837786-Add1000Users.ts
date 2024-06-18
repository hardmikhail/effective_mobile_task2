import { randomInt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Add1000Users1718740837786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];

    for (let i = 1; i <= 1000; i++) {
      const firstName = `firstName${i}`;
      const lastName = `lastName${i}`;
      const age = randomInt(99);
      const gender = 'male' ? i % 3 == 0 : 'female';
      const healthProblems = true ? i % 3 == 0 : false;
      users.push(
        `('${firstName}', '${lastName}', '${age}', ${gender}, ${healthProblems})`,
      );
    }
    // await queryRunner.query(`CREATE TABLE "postgres" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "healthProblems" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);

    await queryRunner.query(
      `INSERT INTO "user" ("firstName", "lastName", "age", "gender", "healthProblems") VALUES ${users.join(', ')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE firstName LIKE 'firstName%'`,
    );
  }
}
