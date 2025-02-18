import knex from "../config/db.js";

export async function createUser(user) {
  return knex("users").insert(user);
}

export async function getUserByEmail(email) {
  return knex("users").where({ email }).first();
}