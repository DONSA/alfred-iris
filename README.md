# Iris - Alfred Workflow

This workflow allows you to quick search for a [movie](http://www.omdbapi.com/) or [subtitles](http://www.opensubtitles.org/).

## How to configure
- Import **Iris.alfredworkflow**;
- Generate a [OMDb API Key](http://www.omdbapi.com/apikey.aspx) and add it to the environment variable **OMDB_API_KEY**;
- Specify the languages by which you want to search for subtitles by filling environment variable **OS_LANGUAGES** with a list (in order of preference) of language codes (e.g. `en pt fr`).

![Search](https://i.imgur.com/yzTtYxT.png)


## How to use it

### Movies

The shortcut to search for a movie is: **⌥ + ⇧ + ⌘ + i**.
Alternatively you can use the keyword: **iris**.

![Search](http://i.imgur.com/ZgqmXsH.png)

The **alt** key allows you to search for subtitles by selected IMDB id.

### Subtitles

The shortcut to search for subtitles is: **⌥ + ⇧ + ⌘ + o**.
Alternatively you can use the keyword: **os**.

![Search](http://i.imgur.com/ybcRSnC.png)

You can also search for subtitles by providing the file path. It will calculate the hash automatically and suggest subtitles for the same release.

![Search by file path](http://i.imgur.com/pwWNTiQ.png)

About
===
The workflow is developed by [@donsa](http://twitter.com/nunolopes_99/).
