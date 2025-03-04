


interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: "Ed Sheeran",
        year: 2015
    }
}

const song = "New Song";
const duration = 120;
const author = "Unknown";
const { song: anotherSong, songDuration: anotherduration, details: {author: anotherAuthor} } = audioPlayer;

// console.log(`Song: ${anotherSong}`);
// console.log(`Duration: ${anotherduration}`);
// console.log(`Author: ${anotherAuthor}`);

// *****************

const dbz: string [] = ["Goku", "Vegeta", "Trunks"];
const trunks = dbz[3] || "No existe";
console.error(`Personaje 3: ${trunks}`)