var defaultList = [
  "Grupo",
  "Família",
  "Comunidade",
  "Galera",
  "Filho",
  "Filha",
];

var salutationInput = () => {
  return $("#salutation");
};
var messageInput = () => {
  return $("#message");
};

function jsonCallback(jsonObject) {
  alert(jsonObject.start.count);
}

function defaultSalutation() {
  let dayTime = () => {
    var now = new Date().getHours();

    if (now >= 06 && now <= 12) {
      return "dia";
    } else if (now >= 13 && now <= 18) {
      return "tarde";
    } else {
      return "noite";
    }
  };

  return `Boa ${dayTime()} {sujeito}, Graça e Paz.`;
}

$(function () {
  salutationInput().val(defaultSalutation());

  $("#customSalutation").change(function (e) {
    e.preventDefault();
    let customSalutation = !($(this).val() === "true");
    $(this).val(customSalutation);
    salutationInput().prop("disabled", !customSalutation);

    if (!customSalutation) {
      salutationInput().val(defaultSalutation());
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();
    if (valid()) {
      showTexts();
    } else {
      alert("Preencha todos os campos!");
    }
  });
});

function valid() {
  let salutation = salutationInput().val();
  let message = messageInput().val();

  return notNull(salutation) && notNull(message);
}

function notNull(text) {
  return text != null && text != undefined && text.trim() != "";
}

function showTexts() {
  let texts = [];

  if (salutationInput().val().indexOf("{sujeito}") != -1) {
    let baseText = `${salutationInput().val()} ${messageInput().val()}`;

    texts.push(
      baseText
        .replace(", {sujeito}", "")
        .replace(" {sujeito}", "")
        .replace("{sujeito}", "")
    );

    defaultList.forEach((item) => {
      texts.push(baseText.replace("{sujeito}", item));
    });
  } else {
    texts.push(`${salutationInput().val()} ${messageInput().val()}`);
  }

  showCards(texts);
}

function showCards(texts) {
  $("#form").hide();
  $("#cards").show();

  texts.forEach((text) => printCard(text));
}

function printCard(text) {
  let html = `<div class="card mb-5">
    <div class="card-body">
      <p class="card-text">${text}</p>
      <div class="text-end">
          <a style="cursor: pointer;" onclick="copyToClipboard('${text}')" class="card-link"><i class="fa fa-copy"></i></a>
      </div>
    </div>
  </div>`;

  $("#cards").append(html);
}

function copyToClipboard(text) {
  const elem = document.createElement("textarea");
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
}
