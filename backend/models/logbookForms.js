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
              min_value: { type: Number },
              max_value: { type: Number },
              has_remarks: {
                type: Boolean,
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
              min_value: { type: Number },
              max_value: { type: Number },
              has_remarks: {
                type: Boolean,
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
              min_value: { type: Number },
              max_value: { type: Number },
              has_remarks: {
                type: Boolean,
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
    has_operational_performed_section: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LogbookForm", logbookFormsSchema);
