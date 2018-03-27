'use strict';

const alfy    = require('alfy')
const OmdbApi = require('omdb-api-pt')
const path    = require('path')
const Jimp    = require("jimp");

const TMPDIR       = process.env.TMPDIR
const OMDB_API_KEY = process.env.OMDB_API_KEY

const omdb = new OmdbApi({
    apiKey: OMDB_API_KEY
});

omdb.bySearch({search: alfy.input}).then(({Search: movies}) => {

    let items = [];

    if (!movies) {
        items.push({
            title: `"${alfy.input.replace(/\\/g, '')}" sleep with the fishes...`,
            valid: true
        });

        return alfy.output(items);
    }

    let promises = [];
    movies.forEach(movie => {
        promises.push(
            omdb.byId({
                imdb: movie.imdbID,
                tomatoes: true
            })
        )
    })

    Promise
        .all(promises)
        .then((movies) => {
            movies.sort((a, b) => a.Year < b.Year).forEach(movie => {

                let tmpFilePath = './icons/poster.png';
                if (movie.Poster !== 'N/A') {
                    let fileName = path.basename(movie.Poster, path.extname(movie.Poster));
                    tmpFilePath = `${TMPDIR}${fileName}.png`;

                    Jimp.read(movie.Poster, (err, lenna) => {
                        if (err) throw err

                        lenna.contain(128, 128).write(tmpFilePath)
                    })
                }

                items.push({
                    title: `${movie.Title} (${movie.Year})`,
                    subtitle: _getSubtitle(movie),
                    arg: movie.imdbID.replace('tt', ''),
                    icon: {
                        path: tmpFilePath
                    }
                })
            })

            alfy.output(items)
        })
        .catch(error => {
             console.error(error)
        })
})
.catch(error => {
    console.error(error)
});

const _getSubtitle = movie => {
    let subtitle = [];

    if (movie.Runtime !== 'N/A') subtitle.push(movie.Runtime)
    if (movie.Metascore !== 'N/A') subtitle.push(`Metascore: ${movie.Metascore}`)
    if (movie.imdbRating !== 'N/A') subtitle.push(`Rating: ${movie.imdbRating}`)
    if (movie.tomatoMeter !== 'N/A') subtitle.push(`Rotten: ${movie.tomatoMeter}`)

    return subtitle.join(' | ')
}
