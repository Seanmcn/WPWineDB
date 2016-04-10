<h2>Sunburst</h2>
<h4>A breakdown by wine color &amp; variety</h4>

<script src="http://d3js.org/d3.v3.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"
      integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
<!-- jQuery -->
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>-->

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"></script>
<div class="row">
    <div class="col-md-8">
        <div id="sunburst"></div>
    </div>
    <div class="col-md-4">

        <div class="row" id="normalWindow">
            <div class="row">
                <div class="col-md-12" id="info_title"></div>
            </div>
            <div class="row">
                <div class="col-md-8" id="info_content">
                    <ul>
                        <li>Hover over sunburst areas to get section name</li>
                        <li>Click sunburst area to facet to that section</li>
                        <li>Clicking a wine will replace this text with the wine information.</li>
                        <li>At anytime you can click on the center of the sunburst to go up a level.</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row" id="singleWine">
            <div class="row" id="image">
                <div class="col-md-12 content"></div>
            </div>
            <div class="row" id="name">
                <div class="col-md-4 bold">Name</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="price">
                <div class="col-md-4 bold">Price</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="vintage">
                <div class="col-md-4 bold">Vintage</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="eyes">
                <div class="col-md-4 bold">Eyes</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="mouth">
                <div class="col-md-4 bold">Mouth</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="nose">
                <div class="col-md-4 bold">Nose</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="overall">
                <div class="col-md-4 bold">Overall</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="link">
                <div class="col-md-4 bold">URL</div>
                <div class="col-md-8 content"></div>
            </div>
            <div class="row" id="db_link">
                <div class="col-md-4 bold">View in DB</div>
                <div class="col-md-8 content"><a id="sunburstViewInDB"><i class="fa fa-database"></i></a></div>
            </div>
        </div>
    </div>

</div>


<h2>Database<a id="popoutTable" class="wineDbPopAction"><i class="fa fa-external-link"></i> Pop-out</a></h2>
<h4>Search &amp; filter wine data to your needs</h4>
<div class="alert alert-info" role="alert"><strong>Note: </strong>I recommended that you use
    <a class="wineDbPopAction">pop-out mode</a> to browse/search the database.
</div>
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css" media="all">
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/responsive/2.0.2/css/responsive.dataTables.min.css"
      media="all">
<script type="text/javascript" src="//cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/responsive/2.0.2/js/dataTables.responsive.min.js"></script>
<script src="//cdn.jsdelivr.net/jquery.scrollto/2.1.2/jquery.scrollTo.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<div id="wineDBContainer">
    <table id="wineDataTable" class="display responsive no-wrap" cellspacing="0" width="100%"></table>
</div>