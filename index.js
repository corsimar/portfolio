var marginLeftElements = [];
var itemEnabledColor = "#FFFFFF";
var itemDisabledColor = "#F0F0F0";
var phoneToast, emailToast;

function switchOption(event) {
  let target = $(event.target);

  if (!target.hasClass("active-button")) {
    let element = $(".active-button");

    if (element.length > 0) {
      let oldTarget = $(element[0]);

      oldTarget.removeClass("active-button");
      hideOption(oldTarget[0].outerText);
    }

    target.addClass("active-button");
    showOption(target[0].outerText);
  } else {
    target.removeClass("active-button");
    hideOption(target[0].outerText);
  }
}

function showOption(optionName) {
  optionName = optionName.replace(" ", "-");

  let targets = $("." + optionName.toLowerCase());

  for (let i = 0; i < targets.length; i++) $(targets[i]).removeClass("d-none");
}

function hideOption(optionName) {
  optionName = optionName.replace(" ", "-");

  let targets = $("." + optionName.toLowerCase());

  for (let i = 0; i < targets.length; i++) $(targets[i]).addClass("d-none");
}

function handleHackathonItem(event) {
  let target = $(event.target);

  if (target[0].localName === "span") {
    target = target.parent();
  }

  if (target.css("background-color") === "rgb(240, 240, 240)")
    target.css("background-color", itemEnabledColor);
  else target.css("background-color", itemDisabledColor);
}

function addMarginLeft() {
  for (let i = 0; i < marginLeftElements.length; i++)
    $(marginLeftElements[i]).addClass("ms-5");
}

function removeMarginLeft() {
  if (marginLeftElements.length == 0) marginLeftElements = $(".ms-5");

  for (let i = 0; i < marginLeftElements.length; i++)
    $(marginLeftElements[i]).removeClass("ms-5");
}

function handleMarginLeft() {
  let windowWidth = $(window).width();

  if (windowWidth < 900) removeMarginLeft();
  else addMarginLeft();
}

function initToasts() {
  phoneToast = new bootstrap.Toast($("#phoneToast")[0]);
  emailToast = new bootstrap.Toast($("#emailToast")[0]);

  let emailToastElement = $("#emailToast");
  let phoneToastElement = $("#phoneToast");

  emailToastElement.on("hidden.bs.toast", function () {
    if (phoneToastElement.hasClass("show")) {
      phoneToastElement.css({
        left: phoneToastElement.css("left"),
        top: $(window).height() - phoneToastElement.height() - 50,
      });
    }
  });

  emailToastElement.on("shown.bs.toast", function () {
    if (phoneToastElement.hasClass("show")) {
      phoneToastElement.css({
        left: phoneToastElement.css("left"),
        top: $(window).height() - phoneToastElement.height() - 50,
      });
    }
  });

  phoneToastElement.on("hidden.bs.toast", function () {
    if (emailToastElement.hasClass("show")) {
      emailToastElement.css({
        left: emailToastElement.css("left"),
        top: $(window).height() - emailToastElement.height() - 50,
      });
    }
  });

  phoneToastElement.on("shown.bs.toast", function () {
    if (emailToastElement.hasClass("show")) {
      emailToastElement.css({
        left: emailToastElement.css("left"),
        top: $(window).height() - emailToastElement.height() - 50,
      });
    }
  });
}

function showPhoneNumber() {
  let documentWidth = $(document).width(),
    documentHeight = $(window).height();
  let toastElement = $("#phoneToast");

  phoneToast.show();

  toastElement.css("position", "absolute");

  let topPosition = documentHeight - toastElement.height() - 50;
  let emailToastElement = $("#emailToast");

  if (emailToastElement.hasClass("show"))
    topPosition = topPosition - emailToastElement.height() - 24;

  toastElement.css({
    left: (documentWidth - toastElement.width()) / 2,
    top: topPosition,
  });
}

function showEmail() {
  let documentWidth = $(document).width(),
    documentHeight = $(window).height();
  let toastElement = $("#emailToast");

  emailToast.show();

  toastElement.css("position", "absolute");

  let topPosition = documentHeight - toastElement.height() - 50;
  let phoneToastElement = $("#phoneToast");

  if (phoneToastElement.hasClass("show"))
    topPosition = topPosition - phoneToastElement.height() - 24;

  toastElement.css({
    left: (documentWidth - toastElement.width()) / 2,
    top: topPosition,
  });
}

function copyToClipboard(event, text) {
  navigator.clipboard.writeText(text);
  console.log(event);
}

$(document).ready(function () {
  displayProjects();
  displayHackathons();
  handleMarginLeft();
  initToasts();

  $("#projectsWrapper").children().eq(0).removeClass("collapsed");
  $("#projectsWrapper").children().eq(0).trigger("click");
  $("#naturallanguageprocessingProjects").children().eq(0).children().eq(1).children().eq(0).children().eq(0).trigger("click");
});

$(window).on("resize", function () {
  handleMarginLeft();
});
