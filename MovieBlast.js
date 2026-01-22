const MAIN_URL = "https://app.cloud-mb.xyz";

function getManifest() {
  return {
    id: "com.likhith.movieblast",
    name: "MovieBlast",
    internalName: "MovieBlast",
    version: 1,
    description: "MovieBlast Provider",
    language: "te",
    types: ["Movies"],
    baseUrl: MAIN_URL
  };
}

async function getHome() {
  return {
    "Welcome": [
      {
        url: MAIN_URL,
        title: "MovieBlast Loaded Successfully",
        posterUrl: "",
        year: 2024,
        type: "movie"
      }
    ]
  };
}

globalThis.getManifest = getManifest;
globalThis.getHome = getHome;
