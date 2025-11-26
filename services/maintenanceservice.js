const express = require("express");
const router = express.Router();
const db = require("./db");

// Create new preventive maintenance record
router.post("/add", async (req, res) => {
  try {
    const data = req.body;

    const query = `
      INSERT INTO "Preventive_maintenance" (
        "VOH -Energy", "VOH-objective", "Voh-realisé",
        "Energy-consumption ", "Energy-consumption-objective", "Energy-consumption-realise",
        "Maintenance-PO ", "Maintenance-PO-objective", "Maintenance-PO-realise",
        "Prenventif-Real ", "Prenventif-Real-objective", "Prenventif-Real-realise",
        "Maintenance-Cost", "Maintenance-Cost-objective", "Maintenance-Cost-realise",
        "MTBF", "MTBF-Target", "MTBF-Completed",
        "MTTR", "MTTR-Target", "MTTR-Completed",
        "Availability", "Availability-objective", "Availability-realise",
        "Total-Hours-lost", "Total-hours-lost-Target", "Total-hour-lost-completed",
        "Factory-efficiency", "Factory-efficiency-objective", "Factory-efficiency-realise",
        "spare parts PO", "spare-parts-PO-objective", "spare-parts-PO-realise",
        "created-date"
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,
        $17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
        $31,$32,$33,$34
      )
      RETURNING *;
    `;

    const values = [
      data["VOH -Energy"], data["VOH-objective"], data["Voh-realisé"],
      data["Energy-consumption"], data["Energy-consumption-objective"], data["Energy-consumption-realise"],
      data["Maintenance-PO"], data["Maintenance-PO-objective"], data["Maintenance-PO-realise"],
      data["Prenventif-Real"], data["Prenventif-Real-objective"], data["Prenventif-Real-realise"],
      data["Maintenance-Cost"], data["Maintenance-Cost-objective"], data["Maintenance-Cost-realise"],
      data["MTBF"], data["MTBF-Target"], data["MTBF-Completed"],
      data["MTTR"], data["MTTR-Target"], data["MTTR-Completed"],
      data["Availability"], data["Availability-objective"], data["Availability-realise"],
      data["Total-Hours-lost"], data["Total-hours-lost-Target"], data["Total-hour-lost-completed"],
      data["Factory-efficiency"], data["Factory-efficiency-objective"], data["Factory-efficiency-realise"],
      data["spare parts PO"], data["spare-parts-PO-objective"], data["spare-parts-PO-realise"],
      data["created-date"]
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "Preventive maintenance added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting maintenance:", error);
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
    const result = await db.query(
      `UPDATE "Preventive_maintenance"
       SET "VOH-objective"=$1, "Voh-realisé"=$2, "Energy-consumption-objective"=$3, "Energy-consumption-realise"=$4,
           "Maintenance-PO-objective"=$5, "Maintenance-PO-realise"=$6, "Maintenance-Cost-objective"=$7, "Maintenance-Cost-realise"=$8
       WHERE maintenance_id=$9
       RETURNING *`,
      [
        form["VOH-objective"],
        form["Voh-realisé"],
        form["Energy-consumption-objective"],
        form["Energy-consumption-realise"],
        form["Maintenance-PO-objective"],
        form["Maintenance-PO-realise"],
        form["Maintenance-Cost-objective"],
        form["Maintenance-Cost-realise"],
        id
      ]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update maintenance" });
  }
});

module.exports = router;
