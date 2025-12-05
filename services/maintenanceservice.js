const express = require("express");
const router = express.Router();
const db = require("./db");

// Create new preventive maintenance record
router.post("/add", async (req, res) => {
  try {
    const data = req.body;

    const query = `
      INSERT INTO "Preventive_maintenance" (
        "VOH-objective",
        "Voh-realise",
        "Energy-consumption-objective",
        "Energy-consumption-realise",
        "Maintenance-PO-objective",
        "Maintenance-PO-realise",
        "Prenventif-Real-objective",
        "Prenventif-Real-realise",
        "Maintenance-Cost-objective",
        "Maintenance-Cost-realise",
        "MTBF-Target",
        "MTBF-Completed",
        "MTTR-Target",
        "MTTR-Completed",
        "Availability-objective",
        "Availability-realise",
        "Total-hours-lost-Target",
        "Total-hours-lost-completed",
        "Factory-efficiency-objective",
        "Factory-efficiency-realise",
        "created-date",
        "Status",
        "spare-parts-stock-objective",
        "spare-parts-stock-realise"
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,$21,$22,$23,$24
      )
      RETURNING *;
    `;

    const values = [
      data["VOH-objective"],
      data["Voh-realise"],
      data["Energy-consumption-objective"],
      data["Energy-consumption-realise"],
      data["Maintenance-PO-objective"],
      data["Maintenance-PO-realise"],
      data["Prenventif-Real-objective"],
      data["Prenventif-Real-realise"],
      data["Maintenance-Cost-objective"],
      data["Maintenance-Cost-realise"],
      data["MTBF-Target"],
      data["MTBF-Completed"],
      data["MTTR-Target"],
      data["MTTR-Completed"],
      data["Availability-objective"],
      data["Availability-realise"],
      data["Total-hours-lost-Target"],
      data["Total-hours-lost-completed"],
      data["Factory-efficiency-objective"],
      data["Factory-efficiency-realise"],
      data["created-date"],
      data["Status"],
      data["spare-parts-stock-objective"],
      data["spare-parts-stock-realise"]
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "Preventive maintenance added successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("❌ Error inserting maintenance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ NEW GET endpoint to fetch all maintenances
router.get("/list", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "Preventive_maintenance" ORDER BY maintenance_id DESC`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch maintenance list" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM "Preventive_maintenance" WHERE maintenance_id = $1`, [id]);
    res.status(200).json({ message: "Maintenance deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete maintenance" });
  }
});

// ------------------------
// EDIT maintenance
// ------------------------
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const form = req.body;

  try {
    const query = `
      UPDATE "Preventive_maintenance"
      SET 
        "VOH-objective" = $1,
        "Voh-realise" = $2,
        "Energy-consumption-objective" = $3,
        "Energy-consumption-realise" = $4,
        "Maintenance-PO-objective" = $5,
        "Maintenance-PO-realise" = $6,
        "Prenventif-Real-objective" = $7,
        "Prenventif-Real-realise" = $8,
        "Maintenance-Cost-objective" = $9,
        "Maintenance-Cost-realise" = $10,
        "MTBF-Target" = $11,
        "MTBF-Completed" = $12,
        "MTTR-Target" = $13,
        "MTTR-Completed" = $14,
        "Availability-objective" = $15,
        "Availability-realise" = $16,
        "Total-hours-lost-Target" = $17,
        "Total-hours-lost-completed" = $18,
        "Factory-efficiency-objective" = $19,
        "Factory-efficiency-realise" = $20,
        "Status" = $21,
        "spare-parts-stock-objective" = $22,
        "spare-parts-stock-realise" = $23
      WHERE maintenance_id = $24
      RETURNING *;
    `;

    const values = [
      form["VOH-objective"],
      form["Voh-realise"],
      form["Energy-consumption-objective"],
      form["Energy-consumption-realise"],
      form["Maintenance-PO-objective"],
      form["Maintenance-PO-realise"],
      form["Prenventif-Real-objective"],
      form["Prenventif-Real-realise"],
      form["Maintenance-Cost-objective"],
      form["Maintenance-Cost-realise"],
      form["MTBF-Target"],
      form["MTBF-Completed"],
      form["MTTR-Target"],
      form["MTTR-Completed"],
      form["Availability-objective"],
      form["Availability-realise"],
      form["Total-hours-lost-Target"],
      form["Total-hours-lost-completed"],
      form["Factory-efficiency-objective"],
      form["Factory-efficiency-realise"],
      form["Status"],
      form["spare-parts-stock-objective"],
      form["spare-parts-stock-realise"],
      id
    ];

    const result = await db.query(query, values);

    res.status(200).json({
      message: "Preventive maintenance updated successfully",
      data: result.rows[0]
    });

  } catch (err) {
    console.error("❌ Error updating maintenance:", err);
    res.status(500).json({ error: "Failed to update maintenance" });
  }
});


module.exports = router;
