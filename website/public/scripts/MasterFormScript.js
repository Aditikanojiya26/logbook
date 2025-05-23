// Configuration
const FIELD_TYPES = {
  text: "Text",
  number: "Number",
  select: "Select",
  date: "Date",
  time: "Time",
  checkbox: "Checkbox",
};

// State management
const state = {
  sectionCounts: {
    shiftBegin: 0,
    shiftMid: 0,
    shiftEnd: 0,
    midnight: 0,
  },
};

// Form validation
const form = document.getElementById("masterForm");
form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.classList.add("was-validated");
});

// Section management
function addSection(shiftType) {
  const sectionIndex = state.sectionCounts[shiftType]++;
  const container = document.getElementById(`${shiftType}Sections`);

  const sectionHTML = `
      <div class="card mb-3" id="${shiftType}-section-${sectionIndex}">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Section Name</label>
            <input type="text" 
                   name="${shiftType}[section][${sectionIndex}][section_name]" 
                   class="form-control" 
                   required>
          </div>
  
          <div id="${shiftType}-fields-${sectionIndex}" class="mb-3"></div>
  
          <div class="d-flex gap-2">
            <button type="button" 
                    class="btn btn-secondary" 
                    onclick="addField('${shiftType}', ${sectionIndex})"
                    aria-label="Add field to section">
              <i class="bi bi-plus-lg"></i> Add Field
            </button>
            <button type="button" 
                    class="btn btn-danger" 
                    onclick="removeSection('${shiftType}-section-${sectionIndex}')"
                    aria-label="Remove section">
              <i class="bi bi-trash"></i> Remove Section
            </button>
          </div>
        </div>
      </div>
    `;

  container.insertAdjacentHTML("beforeend", sectionHTML);
}

function addField(shiftType, sectionIndex) {
  const fieldsContainer = document.getElementById(
    `${shiftType}-fields-${sectionIndex}`
  );
  const fieldId = `${shiftType}-field-${sectionIndex}-${fieldsContainer.children.length}`;

  const fieldHTML = `
    <div class="field-row row g-2 align-items-end mb-2" id="${fieldId}">
      <!-- Existing Field Name and Field Type Inputs -->
      <div class="col-md-4">
        <label class="form-label">Field Name</label>
        <input type="text" 
               name="${shiftType}[section][${sectionIndex}][fields][][field_name]" 
               class="form-control" 
               required>
      </div>
      <div class="col-md-3">
        <label class="form-label">Field Type</label>
        <select name="${shiftType}[section][${sectionIndex}][fields][][field_type]" 
                class="form-select" 
                onchange="toggleOptionsField(this)">
          ${Object.entries(FIELD_TYPES)
            .map(
              ([value, label]) => `<option value="${value}">${label}</option>`
            )
            .join("")}
        </select>
      </div>
      <div class="col-md-4 options-field" style="display: none;">
        <label class="form-label">Options (comma separated)</label>
        <input type="text" 
               name="${shiftType}[section][${sectionIndex}][fields][][options]" 
               class="form-control">
      </div>
      <div class="col-md-1">
        <button type="button" 
                class="btn btn-danger" 
                onclick="removeField('${fieldId}')"
                aria-label="Remove field">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Unit of Measurement -->
      <div class="col-md-12 mt-2">
        <input type="checkbox" class="form-check-input" onchange="toggleUnitOfInput(this)">
        <label class="form-check-label">Add Unit of Measurement?</label>
        <input type="text" class="form-control mt-2 d-none" name="${shiftType}[section][${sectionIndex}][fields][][unit]" placeholder="e.g. °C, Bar">
      </div>

       <!-- Min/Max Range -->
      <div class="col-md-12 mt-2">
        <input type="checkbox" class="form-check-input" id="rangeToggle_${sectionIndex}_${
    fieldsContainer.children.length
  }" onchange="toggleRangeInputs(this)">
        <label class="form-check-label" for="rangeToggle_${sectionIndex}_${
    fieldsContainer.children.length
  }">Add Min/Max Range?</label>
      </div>
      <div class="row mt-2 range-inputs d-none">
        <div class="col-md-6">
          <label class="form-label">Min Value</label>
          <input type="number" class="form-control" name="${shiftType}[section][${sectionIndex}][fields][][min_value]" step="any">
        </div>
        <div class="col-md-6">
          <label class="form-label">Max Value</label>
          <input type="number" class="form-control" name="${shiftType}[section][${sectionIndex}][fields][][max_value]" step="any">
        </div>
      </div>
      
      <!-- Has Remarks -->
      <div class="col-md-12 mt-2">
        <input type="checkbox" class="form-check-input" name="${shiftType}[section][${sectionIndex}][fields][][has_remarks]" id="remarksCheckbox_${sectionIndex}_${
    fieldsContainer.children.length
  }">
        <label class="form-check-label" for="remarksCheckbox_${sectionIndex}_${
    fieldsContainer.children.length
  }">Include Remarks Field?</label>
      </div>
    </div>
  `;

  fieldsContainer.insertAdjacentHTML("beforeend", fieldHTML);
}

// Helper functions
function removeSection(sectionId) {
  document.getElementById(sectionId).remove();
}

function removeField(fieldId) {
  document.getElementById(fieldId).remove();
}

function toggleOptionsField(selectElement) {
  const optionsField = selectElement
    .closest(".field-row")
    .querySelector(".options-field");
  optionsField.style.display =
    selectElement.value === "select" || selectElement.value === "checkbox"
      ? "block"
      : "none";
}

function toggleUnitOfInput(checkbox) {
  const unitInput = checkbox
    .closest(".field-row")
    .querySelector('input[name*="[unit]"]');
  if (checkbox.checked) {
    unitInput.classList.remove("d-none"); // Show unit input
  } else {
    unitInput.classList.add("d-none"); // Hide unit input
  }
}

function toggleRangeInputs(checkbox) {
  const rangeInputs = checkbox
    .closest(".field-row")
    .querySelector(".range-inputs");
  if (checkbox.checked) {
    rangeInputs.classList.remove("d-none");
  } else {
    rangeInputs.classList.add("d-none");
    // Optionally, clear the input values when hiding
    rangeInputs
      .querySelectorAll("input")
      .forEach((input) => (input.value = ""));
  }
}

//Submit Script
async function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById("masterForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const formData = new FormData(form);
  const payload = {
    unit: formData.get("unit"),
    role: formData.get("role"),
    shiftBeg: { section: [] },
    shiftMid: { section: [] },
    shiftEnd: { section: [] },
    midnight: { section: [] },
    has_operational_performed_section: document.getElementById(
      "operationPerformedToggle"
    ).checked,
  };

  ["shiftBegin", "shiftMid", "shiftEnd", "midnight"].forEach((shiftType) => {
    const sections = document.querySelectorAll(`#${shiftType}Sections > .card`);
    const formattedSections = [];

    sections.forEach((sectionCard) => {
      const sectionName = sectionCard.querySelector(
        'input[name*="[section_name]"]'
      ).value;
      const fields = [];

      const fieldRows = sectionCard.querySelectorAll(".field-row");
      fieldRows.forEach((row) => {
        const fieldName = row.querySelector(
          'input[name*="[field_name]"]'
        ).value;
        const fieldType = row.querySelector(
          'select[name*="[field_type]"]'
        ).value;
        const optionsInput = row.querySelector('input[name*="[options]"]');
        const options = optionsInput && optionsInput.value
  ? optionsInput.value.split(",").map(opt => opt.trim()).filter(opt => opt !== "")
  : [];

        // Get the checkbox and input for the unit of measurement
        const unitCheckbox = row.querySelector('input[type="checkbox"]');
        const unitInput = row.querySelector('input[name*="[unit]"]');
        const unit = unitCheckbox.checked && unitInput ? unitInput.value : ""; // Get unit if checkbox is checked

        //Min/Max
        const minInput = row.querySelector('input[name*="[min_value]"]');
        const maxInput = row.querySelector('input[name*="[max_value]"]');

        const min_value =
          minInput && minInput.value !== ""
            ? parseFloat(minInput.value)
            : undefined;
        const max_value =
          maxInput && maxInput.value !== ""
            ? parseFloat(maxInput.value)
            : undefined;

        //Has Remarks?
        const remarksCheckbox = row.querySelector(
          'input[name*="[has_remarks]"]'
        );
        const has_remarks = remarksCheckbox ? remarksCheckbox.checked : false; // true if checked, false if not

        fields.push({
          field_name: fieldName,
          field_type: fieldType,
          options: options,
          unit_of_measurement: unit,
          min_value: min_value,
          max_value: max_value,
          has_remarks: has_remarks,
        });
      });

      formattedSections.push({
        section_name: sectionName,
        fields: fields,
      });
    });

    // Map to Mongoose field names
    if (shiftType === "shiftBegin")
      payload.shiftBeg.section = formattedSections;
    if (shiftType === "shiftMid") payload.shiftMid.section = formattedSections;
    if (shiftType === "shiftEnd") payload.shiftEnd.section = formattedSections;
    if (shiftType === "midnight") payload.midnight.section = formattedSections;
  });

  // Submit the payload to server using AJAX (jQuery)
  $.ajax({
    url: "/admin/CreateForm", // The URL to send the POST request to
    type: "POST", // Method type
    contentType: "application/json", // Tell the server we are sending JSON
    data: JSON.stringify(payload), // Convert the payload to a JSON string
    success: function (response) {
      alert("Logbook form submitted successfully!");
      form.reset();
      location.reload(); // or redirect to another page
    },
    error: function (xhr, status, error) {
      const errorData = JSON.parse(xhr.responseText);
      alert("Error: " + errorData.message);
    },
  });
}
