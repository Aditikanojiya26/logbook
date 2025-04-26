const mongoose = require("mongoose");

const logbookFormsSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: true
    },
    role: {
      type: String,
    },
    shiftBeg: {
      section: [
        {
          section_name: {
            type: String,
          },
          fields: [
            {
              field_name: {
                type: String,
              },
              field_type: {
                type: String,
              },
              options: {
                type: [String],
                default: [],
              },
            },
          ],
        },
      ],
    },
    shiftMid: {
      section: [
        {
          section_name: {
            type: String,
          },
          fields: [
            {
              field_name: {
                type: String,
              },
              field_type: {
                type: String,
              },
              options: {
                type: [String],
                default: [],
              },
            },
          ],
        },
      ],
    },
    shiftEnd: {
      section: [
        {
          section_name: {
            type: String,
          },
          fields: [
            {
              field_name: {
                type: String,
              },
              field_type: {
                type: String,
              },
              options: {
                type: [String],
                default: [],
              },
            },
          ],
        },
      ],
    },
    midnight: {
      section: [
        {
          section_name: {
            type: String,
          },
          fields: [
            {
              field_name: {
                type: String,
              },
              field_type: {
                type: String,
              },
              options: {
                type: [String],
                default: [],
              },
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogbookForm", logbookFormsSchema);
