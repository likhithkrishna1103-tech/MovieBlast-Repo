const MAIN_URL = "https://app.cloud-mb.xyz";
const TOKEN = "jdvhjv255vghhgdvfvch2565656jhdcghfdf";

function getManifest() {
    return {
        id: "dev.likhith.movieblast",
        name: "MovieBlast",
        internalName: "MovieBlast",
        version: 1,
        description: "MovieBlast API Provider",
        language: "te",
        tvTypes: ["Movie"],
        baseUrl: MAIN_URL,
        iconUrl: ""
    };
}

async function getHome() {
    const home = {};
    const json = JSON.parse(await _fetch(MAIN_URL + "/api/genres/trending/all/" + TOKEN));

    home["Trending"] = (json.data || []).map(item => ({
        url: MAIN_URL + "/api/media/detail/" + item.id + "/" + TOKEN,
        title: item.name,
        posterUrl: item.poster_path,
        year: 0,
        type: "movie"
    }));

    return home;
}

async function search(query) {
    const json = JSON.parse(await _fetch(MAIN_URL + "/api/search/" + encodeURIComponent(query) + "/" + TOKEN));

    return (json.search || []).map(item => ({
        url: MAIN_URL + "/api/media/detail/" + item.id + "/" + TOKEN,
        title: item.name,
        posterUrl: item.poster_path,
        year: 0,
        type: "movie"
    }));
}

async function load(url) {
    const json = JSON.parse(await _fetch(url));

    return {
        url: url,
        title: json.name,
        posterUrl: json.poster_path,
        plot: json.overview,
        type: note => "movie",
        episodes: [{ name: "Full Movie", url: url, season: 1, episode: 1 }]
    };
}

async function loadStreams(url) {
    const json = JSON.parse(await _fetch(url));

    return (json.videos || []).map(v => ({
        url: v.link,
        quality: v.server || "Auto",
        headers: {}
    }));
}

globalThis.getManifest = getManifest;
globalThis.getHome = getHome;
globalThis.search = search;
globalThis.load = load;
globalThis.loadStreams = loadStreams;
