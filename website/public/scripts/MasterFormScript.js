// Configuration
const FIELD_TYPES = {
    text: 'Text',
    number: 'Number',
    select: 'Select',
    date: 'Date',
    time: 'Time',
    checkbox: 'Checkbox'
  };
  
  // State management
  const state = {
    sectionCounts: {
      shiftBegin: 0,
      shiftMid: 0,
      shiftEnd: 0,
      midnight: 0
    }
  };
  
  // Form validation
  const form = document.getElementById('masterForm');
  form.addEventListener('submit', function(event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
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
  
    container.insertAdjacentHTML('beforeend', sectionHTML);
  }
  
  // Field management
  function addField(shiftType, sectionIndex) {
    const fieldsContainer = document.getElementById(`${shiftType}-fields-${sectionIndex}`);
    const fieldId = `${shiftType}-field-${sectionIndex}-${fieldsContainer.children.length}`;
  
    const fieldHTML = `
      <div class="field-row row g-2 align-items-end mb-2" id="${fieldId}">
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
            ${Object.entries(FIELD_TYPES).map(([value, label]) => 
              `<option value="${value}">${label}</option>`
            ).join('')}
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
      </div>
    `;
  
    fieldsContainer.insertAdjacentHTML('beforeend', fieldHTML);
  }
  
  // Helper functions
  function removeSection(sectionId) {
    document.getElementById(sectionId).remove();
  }
  
  function removeField(fieldId) {
    document.getElementById(fieldId).remove();
  }
  
  function toggleOptionsField(selectElement) {
    const optionsField = selectElement.closest('.field-row').querySelector('.options-field');
    optionsField.style.display = (selectElement.value === 'select' || selectElement.value === 'checkbox') ? 'block' : 'none';
  }
  