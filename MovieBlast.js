const mainUrl = "https://app.cloud-mb.xyz";
const token = "jdvhjv255vghhgdvfvch2565656jhdcghfdf";

const commonHeaders = {
  "User-Agent": "okhttp/5.0.0-alpha.6",
  "Referer": mainUrl + "/"
};

function getManifest() {
  return {
    id: "com.likhith.movieblast",
    name: "MovieBlast",
    internalName: "MovieBlast",
    version: 2,
    description: "MovieBlast Movies & Series",
    language: "te",
    types: ["Movies", "TV"],
    baseUrl: mainUrl
  };
}

// HOME PAGE
function getHome(callback) {
  const url = mainUrl + "/api/genres/trending/all/" + token;

  http_get(url, commonHeaders, (s, d) => {
    const json = JSON.parse(d);
    const movies = [];

    json.data.forEach(m => {
      movies.push({
        name: m.name,
        link: mainUrl + "/api/media/detail/" + m.id + "/" + token,
        image: m.poster_path,
        description: m.overview || ""
      });
    });

    callback(JSON.stringify([{ title: "Trending", Data: movies }]));
  });
}

// SEARCH
function search(query, callback) {
  const url = mainUrl + "/api/search/" + encodeURIComponent(query) + "/" + token;

  http_get(url, commonHeaders, (s, d) => {
    const json = JSON.parse(d);
    const movies = [];

    json.search.forEach(m => {
      movies.push({
        name: m.name,
        link: mainUrl + "/api/media/detail/" + m.id + "/" + token,
        image: m.poster_path,
        description: m.overview || ""
      });
    });

    callback(JSON.stringify([{ title: "Search", Data: movies }]));
  });
}

// LOAD DETAILS
function load(url, callback) {
  http_get(url, commonHeaders, (s, d) => {
    const j = JSON.parse(d);
    callback(JSON.stringify({
      url: url,
      data: d,
      title: j.name || j.title,
      description: j.overview,
      year: parseInt((j.release_date || "0").split("-")[0]) || 0
    }));
  });
}

// STREAMS
function loadStreams(url, callback) {
  http_get(url, commonHeaders, (s, d) => {
    const j = JSON.parse(d);
    const streams = [];

    j.videos.forEach(v => {
      streams.push({
        name: v.server + " - " + v.lang,
        url: v.link,
        headers: commonHeaders
      });
    });

    callback(JSON.stringify(streams));
  });
}

globalThis.getManifest = getManifest;
globalThis.getHome = getHome;
globalThis.search = search;
globalThis.load = load;
globalThis.loadStreams = loadStreams;
