const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const secureBcrypt = require("bcrypt");





const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",   // Change if different
    password: "",   // Change if different
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// **SIGNUP API**
app.post("/signup", async (req, res) => {
    console.log("Received login request:", req.body); ;

    if (!company_name || !company_address || !email || !contact_no || !password || !num_employees) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO user (company_name, company_address, email, contact_no, password, num_employees, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
        db.query(sql, [company_name, company_address, email, contact_no, hashedPassword, num_employees], (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err);
                return res.status(500).json({ error: "Signup failed" });
            }
            res.json({ message: "Signup successful!" });
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "Signup failed" });
    }
});

// **LOGIN API**
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
    console.log("Received login request:", req.body);

    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length === 0) {
            console.log("❌ Email not found:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        // Debug logs
        console.log("✅ User found:", user);
        console.log("🔑 Entered password:", password);
        console.log("🔒 Stored hashed password:", user.password);

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("🔍 Password match:", isMatch);

            if (!isMatch) {
                console.log("❌ Password does not match!");
                return res.status(401).json({ message: "Invalid email or password" });
            }

            console.log("✅ Login successful!");
            res.json({ message: "Login successful", user });

        } catch (error) {
            console.error("❌ Bcrypt error:", error);
            return res.status(500).json({ message: "Error processing request" });
        }
    });
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
