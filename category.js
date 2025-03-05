class Category {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

const categories = [
  new Category("Web Development", "#00bf16"),
  new Category("Python", "#0c9ace"),
  new Category("Streamlit", "#ff5151"),
  new Category("Flask", "#0c9ace"),
  new Category("MongoDB", "#13e719"),
  new Category("jQuery", "#747474"),
  new Category("AJAX", "#aaaaaa"),
  new Category("Chart JS", "#ff5252"),
  new Category("ASP.NET", "#9263ff"),
  new Category("Dapper", "#5fabff"),
  new Category("Angular", "#ff3333"),
  new Category("SQL Server", "#aaaaaa"),
  new Category("JavaScript", "#b2b2b2"),
  new Category("Linear Algebra", "#77b7ff"),
  new Category("Bootstrap", "#d63cff"),
  new Category("NumPy", "#42baff"),
  new Category("SciPy", "#186dde"),
  new Category("OpenCV", "#ff5353"),
  new Category("Clustering", "#40da9e"),
  new Category("Java", "#faa42d"),
  new Category("Geometry", "#0c9512"),
  new Category("MediaPipe", "#3ec6d6"),
  new Category("Web Sockets", "#40c846"),
  new Category("Computer Vision", "#5064ff"),
  new Category("Artificial Neural Network", "#858585"),
  new Category("Django", "#2d6e30"),
  new Category("PyTorch", "#ffa41b"),
];

function getCategory(name) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name === name) return categories[i];
  }

  return null;
}
