module.exports = sendResponse = (res, code, message, data = null) => {
    res.status(code).json({ message, data });
};


/*

res.status(201).json({ message: "Expense created successfully" });
res.status(400).json({ error: "Amount is required" });
res.status(404).json({ error: "Expense not found" });
res.status(500).json({ error: "Internal Server Error" });

*/