var currentPythonFile = null,
  codeFontSizeLabel,
  codeFontSizeRange;

$(document).ready(function () {
  modalDocumentation = $("#modalDocumentation");
  modalFullscreenBtn = $("#modalFullscreenBtn");
  projectCode = $("#projectCode");
  codeFontSizeLabel = $("#codeFontSizeLabel");
  currentPythonFile = $("#llm");
  codeFontSizeRange = $("#codeFontSizeRange");

  setCodeFontSize(12);
  initExpandableElements();
});

function setCodeFontSize(fontSize) {
  codeFontSizeLabel.text(
    "Font size: " + fontSize + "px"
  );
  codeFontSizeRange.val(fontSize);
  $(".project-code").css("font-size", fontSize);
}

function changeCodeFontSize(event) {
  setCodeFontSize(event.target.valueAsNumber);
}

function switchModalFullscreen() {
  let modalDialog = modalDocumentation.children().eq(0);
  let fullscreen = modalDialog.hasClass("modal-fullscreen");

  if (!fullscreen) {
    modalDialog.addClass("modal-fullscreen");
    modalFullscreenBtn.children().eq(0).attr("hidden", true);
    modalFullscreenBtn.children().eq(1).removeAttr("hidden");
  } else {
    modalDialog.removeClass("modal-fullscreen");
    modalFullscreenBtn.children().eq(1).attr("hidden", true);
    modalFullscreenBtn.children().eq(0).removeAttr("hidden");
  }
}

function showPythonFile(event) {
  let id = event.target.id;
  id = id.substring(0, id.length - 3);
  let domElement = $("#" + id);
  
  currentPythonFile.attr("hidden", true);
  currentPythonFile = domElement;
  currentPythonFile.attr("hidden", false);
}

function onclickExpandableElement(event) {
  let element = $(event.target);
  let target = $(element.attr("href"));
  updateExpandableElementText(element, target);
}

function updateExpandableElementText(element, target) {
  if (!element.hasClass("collapsed")) {
    let idx = element.text().indexOf("(");
    if (idx == -1)
      element.text(element.text() + " (click to hide)");
    else
      element.text(element.text().substring(0, idx - 1) + " (click to hide)");
  }
  else {
    let idx = element.text().indexOf("(");
    if (idx == -1)
      element.text(element.text() + " (click to expand)");
    else
      element.text(element.text().substring(0, idx - 1) + " (click to expand)");
  }
}

function initExpandableElements() {
  let elements = $("[data-bs-toggle='collapse']");
  for (let i = 0; i < elements.length; i++) {
    let element = $(elements[i]);
    let href = element.attr("href");
    let target = $(href);

    updateExpandableElementText(element, target);
  }
}