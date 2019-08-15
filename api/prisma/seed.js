const { default: Photon } = require('@generated/photon');
const { genSalt, hash } = require('bcrypt');

const photon = new Photon();

async function seed() {
  const salt = await genSalt();
  const password = await hash('test', salt);

  const users = await photon.users.findMany();

  if (users.length === 0) {
    console.log(
      'No users found, seeding test user. Be sure to delete once logged in',
    );
    await photon.users.create({
      data: {
        password,
        email: 'admin@cdb.dev',
        firstName: 'Christian',
        lastName: 'de Botton',
      },
    });
  } else {
    console.log('Users found, no need to seed.');
  }

  process.exit(0);
}

seed();
