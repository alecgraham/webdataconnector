(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "state",dataType: tableau.dataTypeEnum.string },
            { id: "date",dataType: tableau.dataTypeEnum.string },
            { id: "positive",dataType: tableau.dataTypeEnum.int },
            { id: "positiveIncrease",dataType: tableau.dataTypeEnum.int },
            { id: "negative",dataType: tableau.dataTypeEnum.int },
            { id: "negativeIncrease",dataType: tableau.dataTypeEnum.int },
            { id: "pending",dataType: tableau.dataTypeEnum.int },
            { id: "totalTestResults",dataType: tableau.dataTypeEnum.int },
            { id: "totalTestResultsIncrease",dataType: tableau.dataTypeEnum.int },
            { id: "hospitalized",dataType: tableau.dataTypeEnum.int },
            { id: "hospitalizedIncrease",dataType: tableau.dataTypeEnum.int },
            { id: "death",dataType: tableau.dataTypeEnum.int },
            { id: "deathIncrease",dataType: tableau.dataTypeEnum.int },
            { id: "dateChecked",dataType: tableau.dataTypeEnum.string }

        ];

        var tableSchema = {
            id: "stateHistData",
            alias: "Covid 19 State-level Historical Data",
            columns: cols
        };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://covidtracking.com/api/states/daily.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "state": feat[i].state,
                    "date": feat[i].date,
                    "positive": feat[i].positive,
                    "positiveIncrease": feat[i].positiveIncrease,
                    "negative": feat[i].negative,
                    "negativeIncrease": feat[i].negativeIncrease,
                    "pending":feat[i].pending,
                    "totalTestResults": feat[i].totalTestResults,
                    "totalTestResultsIncrease": feat[i].totalTestResultsIncrease,
                    "hospitalized": feat[i].hospitalized,
                    "hospitalizedIncrease": feat[i].hospitalizedIncrease,
                    "death": feat[i].death,
                    "deathIncrease":feat[i].deathIncrease,
                    "dateChecked":feat[i].dateChecked
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Covid Tracking Project State Historical Data";
            tableau.submit();
        });
    });

})();
