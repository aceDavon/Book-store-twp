export const Toast = (props) => {
  const { msg, style, icon } = props;
  const toastBox = document.createElement("div");
  toastBox.setAttribute("class", style);
  const root = document.getElementById("root");

  setTimeout(() => {
    toastBox.classList.add("hidden");
  }, 2000);

  toastBox.innerHTML = `
      <img src=${icon} alt=${msg.header}/>
      <div>
        <h3>${msg.header}</h3>
        <span>${msg.body}</span>
      </div>
    `;
  return root.appendChild(toastBox);
};
