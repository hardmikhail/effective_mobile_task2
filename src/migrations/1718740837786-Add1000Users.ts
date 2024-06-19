import { randomInt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Add1000Users1718740837786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const batchSize = 10_000;
    const numberOfUsers = 1_000_000;
    console.time('Migration Time');

    for (let i = 0; i < numberOfUsers / batchSize; i++) {
      const users = [];
      for (let j = 0; j < batchSize; j++) {
        const firstName = `firstName #${i * batchSize + j}`;
        const lastName = `lastName #${i * batchSize + j}`;
        const age = randomInt(99);
        const gender = j % randomInt(4) == 0 ? 'male' : 'female';
        const problems = j % randomInt(3) == 0 ? true : false;
        users.push(
          `('${firstName}', '${lastName}', '${age}', '${gender}', '${problems}')`,
        );
      }
      await queryRunner.query(
        `INSERT INTO "user" ("firstName", "lastName", "age", "gender", "problems") VALUES ${users.join(', ')}`,
      );
    }
    console.timeEnd('Migration Time');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE firstName LIKE 'firstName%'`,
    );
  }
}
