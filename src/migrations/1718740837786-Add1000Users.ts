import { randomInt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Add1000Users1718740837786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];

    for (let i = 1; i <= 1_000_000; i++) {
      const firstName = `firstName${i}`;
      const lastName = `lastName${i}`;
      const age = randomInt(99);
      const gender = i % 2 == 0 ? 'male' : 'female';
      const problems = i % 3 == 0 ? true : false;
      users.push(
        `('${firstName}', '${lastName}', '${age}', '${gender}', '${problems}')`,
      );
    }

    await queryRunner.query(
      `INSERT INTO "user" ("firstName", "lastName", "age", "gender", "problems") VALUES ${users.join(', ')}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE firstName LIKE 'firstName%'`,
    );
  }
}
