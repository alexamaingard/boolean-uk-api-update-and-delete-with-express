const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  const createOnePet = (pet) => {
    const createOne = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5) RETURNING *;
    `;

    return db
      .query(createOne, Object.values(pet))
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  const getAll = (query) => {
    let getAll;
    if(query === undefined){
      getAll = `
        SELECT *
          FROM pets;
      `;
    }

    else {
      getAll = `
        SELECT *
          FROM pets
          WHERE microchip = false;
      `;
    }

    return db 
    .query(getAll)
    .then((result) => result.rows)
    .catch(console.error);
  }


  const getOneById = (id) => {
    const getOneById = `
      SELECT * 
      FROM pets
      WHERE id = $1;
    `;

    return db
      .query(getOneById, [id])
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  const getPetTypes = (res) => {
    const getPetTypes = `
      SELECT DISTINCT type
        FROM pets;
    `;
  
    return db 
      .query(getPetTypes)
      .then((result) => result.rows)
      .catch(console.error);
    }

    const getPetByType = (type, query) => {
      const columnName = Object.keys(query)[0];
      const columnValue = Object.values(query)[0];
      console.log("col", columnName);

      if(query === undefined){
        const getPetByType = `
          SELECT * 
          FROM pets
          WHERE type = $1;
        `;

        return db
        .query(getPetByType, [type])
        .then((result) => result.rows)
        .catch(console.error);
        }

      else {
        const getPetByType = `
          SELECT * 
          FROM pets
          WHERE type = $1
          AND ${columnName} = $2;
        `;
        
        return db
        .query(getPetByType, [type, columnValue])
        .then((result) => result.rows)
        .catch(console.error);
      }
    }

  const init = () => {
    createTable().then(() => {
      console.log("\nCreating mock data for Pets...\n");
  
      mockData();
    });
  }

  return {
    createOnePet,
    getOneById,
    getAll,
    getPetTypes,
    getPetByType,
    //getNonMicrochipedPets,
    init
  };
}

module.exports = Pet;
