import { createClient } from "redis";

// Creates and returns a new Redis connection
const getRConnection = async () => {
  const rclient = createClient();
  rclient.on("error", (err) => console.log("Redis Client Error", err));
  await rclient.connect();
  console.log("redis connected");
  return rclient;
};

// READ: Get the list of recently viewed clients for a staff member
// Uses LRANGE to get all items in the list
const getRecentClients = async (staffId) => {
  let rclient;
  try {
    rclient = await getRConnection();
    
    return await rclient.lRange(`staff:${staffId}:recentClients`, 0, -1);
  } finally {
    rclient.quit();
  }
};

// CREATE: Add a client to the recently viewed list
// Uses LREM to remove duplicates, LPUSH to add to front, LTRIM to keep only 10
const addRecentClient = async (staffId, clientId) => {
  let rclient;
  try {
    rclient = await getRConnection();
    const key = `staff:${staffId}:recentClients`;
    await rclient.lRem(key, 0, clientId);
    await rclient.lPush(key, clientId);
    await rclient.lTrim(key, 0, 9);
    console.log("added recent client", clientId, "for staff", staffId);
  } finally {
    rclient.quit();
  }
};

// DELETE: Remove a specific client from the recently viewed list
// Uses LREM to remove the specific client ID
const removeRecentClient = async (staffId, clientId) => {
  let rclient;
  try {
    rclient = await getRConnection();
    await rclient.lRem(`staff:${staffId}:recentClients`, 0, clientId);
    console.log("removed recent client", clientId, "for staff", staffId);
  } finally {
    rclient.quit();
  }
};

// DELETE: Clear the entire recently viewed list for a staff member
// Uses DEL to remove the entire list
const clearRecentClients = async (staffId) => {
  let rclient;
  try {
    rclient = await getRConnection();
    await rclient.del(`staff:${staffId}:recentClients`);
    console.log("cleared recent clients for staff", staffId);
  } finally {
    rclient.quit();
  }
};

export default {
  getRConnection,
  getRecentClients,
  addRecentClient,
  removeRecentClient,
  clearRecentClients,
};