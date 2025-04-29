const mongoose = require("mongoose");

const logbookFormsSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: true,
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
              unit_of_measurement: {
                type: String,
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
              unit_of_measurement: {
                type: String,
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
              unit_of_measurement: {
                type: String,
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
              unit_of_measurement: {
                type: String,
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
