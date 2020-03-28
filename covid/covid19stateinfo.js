(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "state",
            alias: "state",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "state_name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fips",
            alias: "fips",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "covid19Site",
            alias: "covid19Site",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "covid19SiteSecondary",
            alias: "covid19SiteSecondary",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "twitter",
            alias: "twitter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "notes",
            alias: "notes",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "stateInfo",
            alias: "Covid 19 State collection info",
            columns: cols
        };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://covidtracking.com/api/states/info.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "state": feat[i].state,
                    "name": feat[i].name,
                    "fips": feat[i].fips,
                    "covid19Site": feat[i].covid19Site,
                    "covid19SiteSecondary": feat[i].covid19SiteSecondary,
                    "twitter":feat[i].twitter,
                    "notes":feat[i].notes
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Covid Tracking Project State Info";
            tableau.submit();
        });
    });

})();