'use strict';

const alfy = require('alfy')
const OS   = require('opensubtitles-api')
const path = require("path")
const http = require('http')

const HOME           = process.env.HOME
const DOWNLOAD_PATH  = process.env.DOWNLOAD_PATH
const OS_SEARCH_TYPE = process.env.OS_SEARCH_TYPE
const OS_USERAGENT   = process.env.OS_USERAGENT
const OS_LANGUAGES   = process.env.OS_LANGUAGES.split(/[ ,]+/)

const OpenSubtitles = new OS({
    useragent: OS_USERAGENT,
    ssl: true
});

let filePath = `${HOME}/${DOWNLOAD_PATH}`;
let fileName = alfy.input;
let qs = {
    limit: 'all'
};

switch(OS_SEARCH_TYPE) {
    case 'file':
        qs.path = alfy.input;
        filePath = path.parse(alfy.input).dir;
        fileName = path.parse(alfy.input).name;
        break;
    case 'imdb':
        qs.imdbid = alfy.input;
        break;
    default:
        qs.query = alfy.input;
}

let items = [];
OpenSubtitles.search(qs).then(subtitles => {

    let languages = [];
    OS_LANGUAGES.forEach(langcode => {
        if (subtitles[langcode]) {
            languages.push(subtitles[langcode]);
        }
    })

    if (!languages.length) {
        items.push({
            title: 'No subtitles found'
        });
    }

    languages.forEach(language => {
        language.forEach(sub => {
            items.push({
                title: sub.filename,
                subtitle: _getSubtitle(sub),
                arg: JSON.stringify({
                    link: sub.url,
                    path: `${filePath}/${fileName}.srt`
                }),
                icon: {
                    path: './icons/download.png'
                }
            })
        })
    })

    alfy.output(items);
})
.catch(error => {
    console.log(error)
})

const _getSubtitle = sub => {
    let subtitle = []

    subtitle.push(`Language: ${sub.langcode.toUpperCase()}`)
    subtitle.push(`Score: ${sub.score}`)
    subtitle.push(`Downloads: ${sub.downloads}`)

    return subtitle.join(' | ')
}
