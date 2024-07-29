var header, coverHeader;
var projectsTitle, projectsAccordion;
var filtersWrapper;

class Filter {
    constructor(label, backgroundColor) {
      this.label = label;
      this.backgroundColor = backgroundColor;
	  this.selected = false;
    }
}

var filters = [];
var filtersSelected = [];

function updateProjectsTitle() {
    projectsTitle.text("My projects (" + projectsAccordion.children().length + ")");
}

function filterExists(label) {
	for (let i = 0; i < filters.length; i++) {
		if (filters[i].label === label)
			return true;
	}

	return false;
}

function getAllFilters() {
	for (let i = 0; i < projectsAccordion.children().length; i++) {
		var button = projectsAccordion.children().eq(i).children().eq(0).children().eq(0);
		
		for (let j = 0; j < button.children().length; j++) {
			if (button.children().eq(j).hasClass("btn")) continue;

			var label = button.children().eq(j).text();

			if (!filterExists(label)) {
				var backgroundColor = button.children().eq(j).css("background-color");

				filters.push(new Filter(label, backgroundColor));
			}
		}
	}
}

function setFilters() {
	getAllFilters();

	for (let i = 0; i < filters.length; i++) {
		var filter = $("<span></span>").text(filters[i].label);
		filter.attr("id", "filter" + i);
		filter.addClass("badge"); filter.addClass("filter-unselected");

		if (i > 0) {
			filter.addClass("ms-3");
		}

		filter.css({
			"background-color": filters[i].backgroundColor,
			"cursor": "pointer"
		});

		filter.on("click", function() {
			if (filters[i].selected) {
				$("#filter" + i).addClass("filter-unselected");
				filters[i].selected = false;
			}
			else {
				$("#filter" + i).removeClass("filter-unselected");
				filters[i].selected = true;
			}

			showFilteredProjects();
		});

		filtersWrapper.append(filter);
	}
}

function isAnyFilter() {
	for (let i = 0; i < filters.length; i++) {
		if (filters[i].selected)
			return true;
	}

	return false;
}

function isProjectInFilters(label) {
	if (!isAnyFilter()) return true;

	for (let i = 0; i < filters.length; i++) {
		if (filters[i].label === label && filters[i].selected)
			return true;
	}

	return false;
}

function showFilteredProjects() {
	for (let i = 0; i < projectsAccordion.children().length; i++) {
		var button = projectsAccordion.children().eq(i).children().eq(0).children().eq(0);

		for (let j = 0; j < button.children().length; j++) {
			var label = button.children().eq(j).text();

			if (isProjectInFilters(label)) {
				projectsAccordion.children().eq(i).attr("hidden", false);
				break;
			}
			else {
				projectsAccordion.children().eq(i).attr("hidden", true);
			}
		}
	}

	updateProjectsTitle();
}

function searchProjects(event) {
	var input = event.target.value;

	for (let i = 0; i < projectsAccordion.children().length; i++) {
		var text = projectsAccordion.children().eq(i).children().eq(0).children().eq(0).html();
		text = text.substring(0, text.indexOf("<span"));
		
		if (!projectsAccordion.children().eq(i).attr("hidden")) {
			if (!text.toLowerCase().includes(input.toLowerCase())) {
				projectsAccordion.children().eq(i).css("display", "none");
			}
			else {
				projectsAccordion.children().eq(i).css("display", "");
			}
		}
	}
}

$(document).ready(function () {
    header = $("#header");
    coverHeader = $("#coverHeader");
    coverHeader.height(header.height());

    projectsTitle = $("#projectsTitle"); projectsAccordion = $("#projectsAccordion");
    updateProjectsTitle();

	filtersWrapper = $("#filtersWrapper");
	setFilters();
});
