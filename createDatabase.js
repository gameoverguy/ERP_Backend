const { Sequelize } = require("sequelize");
const config = require("./config/config.json")["development"];

async function createDatabase() {
  try {
    // Connect to MySQL without specifying a database
    const sequelize = new Sequelize("", config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
    });

    // Create database if it doesn't exist
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`
    );
    console.log(`Database '${config.database}' checked/created successfully.`);

    await sequelize.close();
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  }
}

createDatabase();
