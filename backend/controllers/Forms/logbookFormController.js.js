const LogbookForm = require("../../models/logbookForms");

const getFormByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const form = await LogbookForm.findOne({ role });

    if (!form) {
      return res.status(404).json({ error: "No form found for the given role" });
    }

   
    const wantsHTML = req.headers.accept && req.headers.accept.includes("text/html");

    if (wantsHTML) {
      
      res.render("logbookForm", { form }); 
    } else {
      res.json(form);
    }

  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { getFormByRole };
