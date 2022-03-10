const comentarios = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const $commentsContainer = document.querySelector("#container-comentarios");
input.classList.add("comentarios__input");

input.addEventListener("keydown", (e) => {
  handeEnter(e, null);
});

$commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handeEnter(e, current) {
  if (e.key === "Enter" && e.target.value !== "") {
    const newComent = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };

    if (current === null) {
      comentarios.unshift(newComent);
    } else {
      current.responses.unshift(newComent);
    }

    e.target.value = "";
    $commentsContainer.innerHTML = "";
    $commentsContainer.appendChild(inputContainer);

    renderComments(comentarios, $commentsContainer);
  }

  function renderComments(arr, parent) {
    arr.forEach((element) => {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("comentario-container");

      const responsesContainer = document.createElement("div");
      responsesContainer.classList.add("respuesta-container");

      const textContainer = document.createElement("div");
      textContainer.textContent = element.text;

      const actionsContainer = document.createElement("div");

      const replyButton = document.createElement("button");
      replyButton.textContent = "Responder";
      replyButton.classList.add("boton", "boton--responder");

      const likeButton = document.createElement("button");
      likeButton.classList.add("boton", "boton--like");
      likeButton.textContent = `${
        element.likes > 0 ? `${element.likes} likes` : "0 likes"
      }`;

      replyButton.addEventListener("click", (e) => {
        const newInput = inputContainer.cloneNode(true);
        newInput.value = "";
        newInput.focus();
        newInput.addEventListener("keydown", (e) => {
          handeEnter(e, element);
        });
        commentContainer.insertBefore(newInput, responsesContainer);
      });

      likeButton.addEventListener("click", (e) => {
        element.likes++;
        likeButton.textContent = `${
          element.likes > 0 ? `${element.likes} likes` : "like"
        }`;
      });

      commentContainer.appendChild(textContainer);
      commentContainer.appendChild(actionsContainer);
      actionsContainer.appendChild(replyButton);
      actionsContainer.appendChild(likeButton);

      commentContainer.appendChild(responsesContainer);

      if (element.responses.length > 0) {
        renderComments(element.responses, responsesContainer);
      }

      parent.appendChild(commentContainer);
    });
  }
}
