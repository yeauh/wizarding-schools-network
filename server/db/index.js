"use strict";

const db = require("./db");
const Sequelize = require("sequelize");
// Require your models and make your associations
 /*
  wizarding-shools model:
  name - not empty or null
  imageUrl - with a default value
  location - not empty or null
  description - extremely large text
 */


const wizardingSchools = db.define("wizardingSchools", {
  name: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING(500),
    defaultValue: "google.com",
  },
  address: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(500),
  },
});


/* 
  firstName - not empty or null
  lastName - not empty or null
  email - not empty or null; must be a valid email
  imageUrl - with a default value
  magicalAbilityScore - decimal between 0 and 10.0
  Students may be associated with at most one wizarding school.
  Likewise, wizarding schools may be associated with many students
*/
const student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   isEmail: {
    //     msg: "Must be a valid email address",
    //   }
    // }
  },
  imageUrl: {
    type: Sequelize.STRING(500),
  },
  // magicalAbilityScore: {
  gpa: {
    type: Sequelize.FLOAT,
    validate: {
      max: 10.0,
      min: 0.0,
    }
  },
  campusId: {
    type: Sequelize.INTEGER,
  }, 
});

/*
  Students may be associated with at most one wizarding school.
  Likewise, wizarding schools may be associated with many students
 */

student.hasOne(wizardingSchools, { through: "enrollments" });
wizardingSchools.belongsToMany(student, { through: "enrollments" });
student.belongsTo(wizardingSchools, { through: "enrollments"});

module.exports = {
  db,
  student,
  wizardingSchools,
};
// await db.sync({ force: true });