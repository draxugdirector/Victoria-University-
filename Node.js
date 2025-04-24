// Node.js Login Route
app.post('/api/login', async (req, res) => {
  const { regNo, password } = req.body;
  const student = await db.query('SELECT * FROM students WHERE reg_no = ?', [regNo]);
  if (!student) return res.status(404).json({ error: "User not found" });
  
  const validPass = await bcrypt.compare(password, student.password);
  if (!validPass) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET);
  res.json({ token, user: student });
});
