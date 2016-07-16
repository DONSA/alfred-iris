var AlfredNode = require('alfred-workflow-nodejs');
var request = require('request');
var actionHandler = AlfredNode.actionHandler;
var workflow = AlfredNode.workflow;

workflow.setName("imdb");

(function main()
{
    actionHandler.onAction("search", function(query)
    {
        var options = {
            url: 'http://www.omdbapi.com',
            method: 'GET',
            qs: {
                't': query,
                'plot': 'short',
                'r': 'json'
            }
        };

        request(options, function (error, response, body)
        {
            if (!error && response.statusCode == 200)
            {
                var result = JSON.parse(body);
                var subtitle = [
                    result['Runtime'],
                    "Metascore: " + result['Metascore'],
                    "Rating: " + result['imdbRating']
                ];

                var Item = AlfredNode.Item;
                var item = new Item({
                    title: result['Title'] + " (" + result['Year'] + ")",
                    subtitle: subtitle.join(" | "),
                    arg: result['imdbID'],
                    icon: "link.png",
                    valid: true
                });

                workflow.addItem(item);
                workflow.feedback();
            }
        });
    });

    AlfredNode.run();
})();
