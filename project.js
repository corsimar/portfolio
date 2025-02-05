var modalCode,
  modalTitle,
  projectCode,
  codeFontSizeRange,
  codeFontSizeLabel,
  modalFullscreenBtn;

class Project {
  constructor(title, category, technologies, description, github, link, code) {
    this.title = title;
    this.category = category;
    this.technologies = technologies;
    this.description = description;
    this.github = github;
    this.link = link;
    this.code = code;
  }
}

function expandCategory(event) {
  let target = $(event.target);

  if (!target.hasClass("lead")) target = target.parent();
  if (!target.hasClass("lead")) target = target.parent();

  if (!target.hasClass("collapsed")) {
    target.children().eq(1).attr("hidden", true);
    target.children().eq(2).removeAttr("hidden");
  } else {
    target.children().eq(2).attr("hidden", true);
    target.children().eq(1).removeAttr("hidden");
  }
}

function displayProjectCategories() {
  let projectsWrapper = $("#projectsWrapper");

  let categoryAux = $("#projectCategory").clone();
  categoryAux.removeAttr("id");
  let projectCategoryWrapperAux = $("#projectCategoryWrapper").clone();

  projectsWrapper.empty();

  for (let i = 0; i < projectCategories.length; i++) {
    if (i > 0) categoryAux.addClass("mt-5");

    let id =
      projectCategories[i].toLowerCase().replaceAll(" ", "") + "Projects";

    // Attributes
    categoryAux.attr("href", "#" + id);
    categoryAux.attr("aria-controls", id);
    projectCategoryWrapperAux.attr("id", id);

    // Content
    categoryAux.children().eq(0).text(projectCategories[i]);

    projectsWrapper.append(categoryAux);
    categoryAux = categoryAux.clone();

    projectsWrapper.append(projectCategoryWrapperAux);
    projectCategoryWrapperAux = projectCategoryWrapperAux.clone();
  }
}

function displayProjects() {
  modalCode = $("#modalCode");
  modalTitle = $("#modalTitle");
  projectCode = $("#projectCode");
  codeFontSizeLabel = $("#codeFontSizeLabel");
  codeFontSizeLabel.text(
    "Font size: " + window.getComputedStyle(projectCode[0]).fontSize
  );
  codeFontSizeRange = $("#codeFontSizeRange");
  codeFontSizeRange.val(
    parseInt(window.getComputedStyle(projectCode[0]).fontSize)
  );
  modalFullscreenBtn = $("#modalFullscreenBtn");

  displayProjectCategories();

  for (let i = 0; i < projects.length; i++) {
    let aux = $("#interactiveProjects")
      .children()
      .eq(0)
      .children()
      .eq(0)
      .clone();
    let projectWrapper = $(
      "#" + projects[i].category.toLowerCase().replaceAll(" ", "") + "Projects"
    )
      .children()
      .eq(0);

    let id =
      projects[i].category.toLowerCase().replaceAll(" ", "") +
      (projectWrapper.children().length - 1);

    let header = aux.children().eq(0).children().eq(0);
    header.attr("data-bs-target", "#" + id);
    header.attr("aria-controls", id);
    header.text(projects[i].title);

    let item = aux.children().eq(1);
    item.attr("id", id);

    let content = item.children().eq(0).children().eq(0);
    if (
      projects[i].category != "Machine Learning" &&
      projects[i].category != "Artificial Intelligence Algorithms" &&
      projects[i].category != "Bachelor Graduation Project"
    ) {
      content
        .children()
        .eq(0)
        .attr(
          "src",
          "projects/" +
            projects[i].title.toLowerCase().replaceAll(" ", "-") +
            ".png"
        );
    } else {
      content.children().eq(0).remove();
      content.prepend(
        "<div class='project-image d-flex justify-content-center align-items-center' style='height: 200px; background-color: #d5d5d5;'><p>No photo available for this project</p></div>"
      );
    }
    content
      .children()
      .eq(1)
      .children()
      .eq(1)
      .html("<p>" + projects[i].description + "</p>");

    if (projects[i].github != null) {
      let githubElement = content
        .children()
        .eq(1)
        .children()
        .eq(0)
        .children()
        .eq(1);

      githubElement.removeClass("d-none");
      githubElement.addClass("d-flex");
      githubElement.attr("href", projects[i].github);
    }

    if (projects[i].link != null) {
      let linkElement = content
        .children()
        .eq(1)
        .children()
        .eq(0)
        .children()
        .eq(2);

      linkElement.removeClass("d-none");
      linkElement.addClass("d-flex");
      linkElement.attr("href", projects[i].link);
    }

    if (projects[i].code != null) {
      let codeElement = content
        .children()
        .eq(1)
        .children()
        .eq(0)
        .children()
        .eq(3);

      codeElement.removeClass("d-none");
      codeElement.addClass("d-flex");
      codeElement.on("click", function () {
        modalTitle.text(projects[i].title);
      });

      codeElement.attr("data-code", "#" + projects[i].code);
    }

    let technologiesWrapper = content
      .children()
      .eq(1)
      .children()
      .eq(2)
      .children()
      .eq(0);
    technologiesWrapper.empty();

    for (let j = 0; j < projects[i].technologies.length; j++)
      technologiesWrapper.append(
        "<span class='badge' style='background-color: " +
          projects[i].technologies[j].color +
          "'>" +
          projects[i].technologies[j].name +
          "</span>"
      );

    aux.attr("hidden", false);
    projectWrapper.append(aux);
  }

  showProjectsCount();
}

function showProjectsCount() {
  for (let i = 0; i < projectCategories.length; i++) {
    let projectsWrapperId =
      "#" + projectCategories[i].toLowerCase().replaceAll(" ", "") + "Projects";

    let projectWrapper = $(projectsWrapperId);
    let projectsCount = projectWrapper.children().eq(0).children().length - 1;
    let projectWrapperTitle = projectWrapper.prev().children().eq(0);

    projectWrapperTitle.text(
      projectWrapperTitle.text() + " (" + projectsCount + ")"
    );
  }
}

function changeCodeFontSize(event) {
  codeFontSizeLabel.text("Font size: " + event.target.valueAsNumber + "px");
  projectCode.css("font-size", event.target.valueAsNumber);
}

function updateProjectCode(event) {
  let target = $(event.target);

  if (target[0].localName === "path") target = target.parent();
  if (target[0].localName === "svg") target = target.parent();
  if (target[0].localName === "span" && !target.hasClass("badge"))
    target = target.parent();

  projectCode.html($(target.attr("data-code")).html());
}

function switchModalFullscreen() {
  let modalDialog = modalCode.children().eq(0);
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

const projectCategories = [
  "Bachelor Graduation Project",
  "Interactive",
  "Machine Learning",
  "Artificial Intelligence Algorithms",
  "Geometry",
  "Desktop Applications",
];

const projects = [
  new Project(
    "Physics simulations controlled by hand gestures using web camera",
    "Bachelor Graduation Project",
    [
      getCategory("MediaPipe"),
      getCategory("OpenCV"),
      getCategory("Artificial Neural Network"),
      getCategory("Django"),
      getCategory("Web Sockets"),
      getCategory("Bootstrap"),
      getCategory("jQuery"),
      getCategory("AJAX"),
    ],
    "I implemented a web application with physics simulations (density, laws of motion) to help students understand physics better. There are specific actions in each simulation that can be done by interacting with the mouse. These same actions can be done by using the web camera as I built a model that recognizes gestures that user is doing and convert it into an action in the simulation. The videostream from the camera that is recording on the web is sent to the backend via web sockets. In the Python backend the model classify the gesture and sends back the result. Each user is able to fine tune the model they use to recognize gestures.",
    null,
    null,
    null
  ),
  new Project(
    "Neural Network (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built a neural network model from scratch using as optimizers: <b>gradient descent</b> and <b>gradient descent with momentum</b>. I implemented 3 activation functions and their derivatives for the hidden layers: <b>ReLU</b>, <b>Leaky ReLU</b> and <b>tanh</b> and for the last layer <b>softmax</b>. The loss function that I used is <b>mean squared error (MSE)</b>. I also implemented the <b>batch standardization (to make the mean equal with 0 and standard deviation with 1)</b> feature. I can also save the weight and biases to a .txt file and later on to load the same model.",
    null,
    null,
    "neuralNetworkCode"
  ),
  new Project(
    "Gaussian Mixture Model (GMM) with Expectation-Maximization (EM) (from scratch)",
    "Machine Learning",
    [
      getCategory("Python"),
      getCategory("NumPy"),
      getCategory("SciPy"),
      getCategory("Clustering"),
    ],
    "I have implemented this clustering model from scratch where the <b>expectation step</b> estimates probabilities of data belonging to each Gaussian and the <b>maximization step</b> updates the parameters <b>(means, variances and weights)</b> in order to maximize the likelihood until either <b>max iterations</b> or <b>tolerance</b> stopping criteria is fulfilled.",
    null,
    null,
    "GMMCode"
  ),
  new Project(
    "Boids Algorithm",
    "Interactive",
    [
      getCategory("jQuery"),
      getCategory("Bootstrap"),
      getCategory("Linear Algebra"),
    ],
    "A boid algorithm simulation that models the flocking behavior of birds using simple rules: <b>separation</b>, <b>alignment</b>, and <b>cohesion</b>. Each boid moves autonomously, adjusting its velocity based on nearby boids.",
    null,
    "boids-algorithm/index.html",
    null
  ),
  new Project(
    "Linear Regression (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I made a linear regression model from scratch. As optimizers I implemented: <b>normal equation</b> and <b>gradient descent</b>. For gradient descent I also implemented the <b>L1</b> and <b>L2</b> regularizations and these stopping criterias: <b>tolerance</b> and <b>maximum number of iterations</b>.",
    null,
    null,
    "linearRegressionCode"
  ),
  new Project(
    "Logistic Regression (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I built this classification model from scratch implementing these optimizers: <b>gradient ascent</b> and <b>Newton's method</b>. I implemented the <b>sigmoid</b> function to convert numbers to (0, 1) interval. As loss function I used <b>log loss</b>. For the gradient ascent optimizer I implemented these stopping criterias: <b>maximum iterations</b> and <b>tolerance</b>.",
    null,
    null,
    "logisticRegressionCode"
  ),
  new Project(
    "Gaussian Naive Bayes (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I built this Gaussian Naive Bayes model from scratch calculating the probability of each class using <b>Bayes' theorem</b>. For each class I model feature <b>likelihoods</b> with <b>Gaussian distributions</b>. The class with the highest posterior probability is returned by the model.",
    null,
    null,
    "gaussianNaiveBayesCode"
  ),
  new Project(
    "Decision Tree (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built this decision tree model from scratch. In a decision tree data is splitted into branches based on features. <b>Entropy</b> is used to measure the impurity in data and <b>information gain</b> is what it is used to evaluate how well a split reduces entropy. The <b>best split</b> maximizes information gain.",
    null,
    null,
    "decisionTreeCode"
  ),
  new Project(
    "Random Forest (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built this random forest model from scratch by ensembling multiple decision tree models.",
    null,
    null,
    "randomForestCode"
  ),
  new Project(
    "K-Nearest Neighbour with PCA - face recognition (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("OpenCV"), getCategory("NumPy")],
    "PCA is a <b>dimensionality reduction</b> technique that extracts the key features from the photos. Then, using the K-Nearest Neighbor model that I implemented from scratch I classify them by comparing them to the closest labeled examples.",
    null,
    null,
    "kNearestNeighboursCode"
  ),
  new Project(
    "KMeans (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy"), getCategory("Clustering")],
    "I have implemented this clustering model in 2 alternatives. The first alternative consists in running the steps in this order: <b>calculate the centroids</b> and then <b>regroup the points</b> and the second alternative consists in the same steps but in reverse order.",
    null,
    null,
    "KMeansCode"
  ),
  new Project(
    "Search Engine (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I implemented this search engine from scratch using these algorithms that rank the documents by relevance: <b>Term Frequency (TF)</b>, <b>Term Frequency - Inverse Document Frequency (TF-IDF)</b> and <b>Okapi BM (Best Matching)</b>. I also used <b>cosine similarity</b> to assess similarity between documents.",
    null,
    null,
    "searchEngineCode"
  ),
  new Project(
    "Householder and Givens Transformations (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "Householder and Givens transformations are orthogonal matrix techniques for QR decomposition. Both simplify linear algebra computations like solving systems and eigenvalue problems.",
    null,
    null,
    "householderGivensCode"
  ),
  new Project(
    "Kaczmarz Method (from scratch)",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "Kaczmars's method is an iterative algorithm for solving linear systems. It projects the solution estimate onto the hyperplane defined by each equation, updating row-by-row and this is gradually converging to the solution.",
    null,
    null,
    "kaczmarzCode"
  ),
  new Project(
    "Hill Climbing",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "Hill climbing is an <b>optimization algorithm</b> that moves towards better solutions by <b>evaluating neighbors</b>. At each iteration, the neighbor with the highest improvement is selected. The algorithm stops when no better neigbor is found, potentially getting stuck in local optima as it doesn't consider global exploration.",
    null,
    null,
    "hillClimbingCode"
  ),
  new Project(
    "Simulated Annealing",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "Simulated annealing is an <b>optimization algorithm</b> that is exploring solutions by accepting both better and, sometimes, worse solutions based on a probability that decreases over time (the <b>temperature</b> parameter). Choosing a worse solution helps escape local optima as it gradually focuses on the global optimum.",
    null,
    null,
    "simulatedAnnealingCode"
  ),
  new Project(
    "Genetic Algorithm",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "This genetic algorithm is an <b>optimization algorithm</b> that evolves solutions through <b>selection</b> (choosing the <b>fittest</b>), crossover (<b>combining parents</b>) and <b>mutation</b> (randomly introducing random changes). Over generations, the population improves toward optimal or near-optimal solutions based on a defined <b>fitness function</b>.",
    null,
    null,
    "geneticAlgorithmCode"
  ),
  new Project(
    "eEvent",
    "Desktop Applications",
    [getCategory("Java")],
    "This is an application that I built in order to keep track of events.",
    "https://github.com/corsimar/eEvent",
    null,
    null
  ),
  new Project(
    "Point inside or outside a simple polygon",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a simple polygon.",
    "https://github.com/corsimar/Punct-interior-exterior-poligon-simplu",
    null,
    null
  ),
  new Project(
    "Point inside or outside a convex polygon",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a convex polygon and between which sides of the polygon it is situated.",
    "https://github.com/corsimar/PunctPoligonConvex",
    null,
    null
  ),
  new Project(
    "Point inside or outside PSLG",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a PSLG and between which sides and in which area of the PSLG it is situated.",
    "https://github.com/corsimar/PunctPSLG",
    null,
    null
  ),
  new Project(
    "Points inside a rectangle",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs the number of points that are inside a rectangle that I draw.",
    "https://github.com/corsimar/PuncteDreptunghi",
    null,
    null
  ),
];

$(window).on("resize", function () {
  codeFontSizeLabel.text(
    "Font size: " + window.getComputedStyle(projectCode[0]).fontSize
  );
  codeFontSizeRange.val(
    parseInt(window.getComputedStyle(projectCode[0]).fontSize)
  );
});
