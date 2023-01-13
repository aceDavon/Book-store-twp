export const form = () => {
  const root = document.getElementById("root");
  const form = document.createElement("form");
  form.setAttribute("class", 'hidden');
  form.setAttribute("id", "userForm");
  form.innerHTML = `
      <div class="userForm">
        <h2>Rent Book</h2>
        <div class="form-section">
          <label for="name">Name</label>
          <input id="name" placeholder="Enter your Name" required />
        </div>
        <div class="form-section">
          <label for="address">Address</label>
          <input id="address" placeholder="Enter your address" required />
        </div>
        <div class="form-section">
          <label for="duration">Duration</label>
          <input id="duration" placeholder="Rental duration?" required />
        </div>
        <div class="form-section">
          <button id="formBtn" class="btn">Submit</button>
        </div>
      </div>`;
  return root.appendChild(form);
};
