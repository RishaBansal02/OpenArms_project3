import express from "express";
const router = express.Router();

import myDB from "../db/myRedisDB.js";

const staffId = "sw001";

// READ: Get the list of recently viewed clients and render the page
router.get("/", async (req, res) => {
  const recentClients = await myDB.getRecentClients(staffId);
  res.render("index", { staffId, recentClients });
});

// CREATE: Add a client to the recently viewed list
router.post("/clients/add", async (req, res) => {
  try {
    const { clientId } = req.body;
    console.log("adding client", clientId);
    await myDB.addRecentClient(staffId, clientId);
    res.redirect("/");
  } catch (e) {
    res.status(500).send("Error adding client: " + e);
  }
});

// DELETE: Remove a specific client from the recently viewed list
router.post("/clients/:clientId/remove", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    await myDB.removeRecentClient(staffId, clientId);
    res.redirect("/");
  } catch (e) {
    res.status(500).send("Error removing client: " + e);
  }
});

// DELETE: Clear the entire recently viewed list
router.post("/clients/clear", async (req, res) => {
  try {
    await myDB.clearRecentClients(staffId);
    res.redirect("/");
  } catch (e) {
    res.status(500).send("Error clearing clients: " + e);
  }
});

export default router;