var fs = require('fs');
var path = require("path");
var http = require('http');
var url = require('url');
var Trakt = require('trakt.tv');

const omdb = new OmdbApi({
    apiKey: '6364c8f4'
});

const trakt = new Trakt({
  client_id: '3e5aa445d20933765aca5313b395a281540623228818aaa801340bc59c511e0e',
  client_secret: '2fe5fb629e805c136d1d334f68c49e6e10d4fde8ce8f74b717d984593cea20be'
});

(function main() {

    /*
    |--------------------------------------------------------------------------
    | Trakt.tv Action
    |--------------------------------------------------------------------------
    |
    | This action search on Trakt.tv for a given IMDB id
    | and return the object
    |
    */
    actionHandler.onAction('trakt', function(query)
    {
        trakt.search({
            id      : query,
            id_type : 'imdb',
            type    : ['movie', 'show']
        })
        .then(results => {
            // trakt.get_codes()
            //     .then(poll => {
            //         console.log(poll);
            //         // Poll contains 'verification_url' you need to visit
            //         // and the 'user_code' you need to use on that url
            //
            //         return trakt.poll_access(poll);
            //         // this second call is required to verify if app was authorized
            //     })
            //     .catch(error => {
            //         if (error.message == 'Expired') {
            //             console.log(error);
            //         }
            //     });

            // const token = trakt.export_token();

            // console.log(token);

            // trakt.refresh_token()
            //     .then(results => {
            //         console.log(results);
            //         // API now has an updated access token
            //     })
            //     .catch(err => {
            //         // Handles errors
            //     });

            // trakt.import_token(token) // Injects stored token.
            //     .then(shows => {
            //         // Contains token, refreshed if needed (store it back)
            //     })
            //     .catch(err => {
            //         // Handles errors
            //     });

            let object = results[0][results[0].type];

            let traktUrl = new Item({
                title: 'Open in Trakt.tv',
                arg: {
                    arg: `https://trakt.tv/${results[0].type}/${object.ids.slug}`,
                    variables: {
                        url: true,
                    }
                },
                icon: './icons/trackt.png',
                valid: true
            })

            workflow.addItem(traktUrl)

            workflow.feedback()
        })
        .catch(error => {
            console.log(error)
            workflow.feedback()
        })
    });

    // actionHandler.onMenuItemSelected('search', function(query, title, data) {
    //     console.log('entrou');
    //     // var Item = AlfredNode.Item;
    //     var item1 = new Item({
    //         title: "Open IMDB",
    //         arg: query,
    //         subtitle: 'data.alias', // we can get data of selected item
    //         valid: true
    //     });
    //
    //     // var item2 = new Item({
    //     //     title: "Item 2 of " + title,
    //     //     arg: "item 2 of " + title + " which has alias " + data.alias,
    //     //     subtitle: data.alias,
    //     //     valid: true
    //     // });
    //
    //     workflow.addItem(item1);
    //     // workflow.addItem(item2);
    //     // generate feedbacks
    //     workflow.feedback();
    // });


    AlfredNode.run();
})();
