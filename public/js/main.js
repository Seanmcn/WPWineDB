jQuery.noConflict();
jQuery(document).ready(function () {
    jQuery.getJSON("http://winedb.zeuslocker.com/data-tables.json", function (json) {

        // DataTable
        jQuery('#wineDataTable').DataTable({
            data: json.data,
            stateSave: false,
            columns: [
                {data: "name", title: "Name"},
                {data: "color", title: "Color"},
                {data: "variety", title: "Variety"},
                {data: "price", title: "Price"},
                {data: "abv", title: "ABV"},
                {data: "region", title: "Region"},
                {data: "sub_region", title: "Sub Region"},
                {data: "eyes", title: "Eyes"},
                {data: "nose", title: "Nose"},
                {data: "mouth", title: "Mouth"},
                {data: "overall", title: "Overall"},
                {data: "producer", title: "Producer"},
                {data: "vintage", title: "Vintage"},
                {data: "description", title: "Description"},
                {data: "link", title: "Post URL"}

            ],
            columnDefs: [
                {targets: [0, 1, 2, 5], searchable: true},
                {targets: '_all', searchable: false}
            ]
        });

    });
});
jQuery('#sunburstViewInDB').on('click', function() {
    console.log("CLICKED");
    var name = jQuery('#sunburstViewInDB').data('name');
    console.log(name);
    var filterInput = jQuery('#wineDataTable_filter input');
    filterInput.val(name);
    filterInput.keyup();
    jQuery(window).scrollTo('#popoutTable');
});
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Overall:</td>' +
        '<td>' + d.overall + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Description:</td>' +
        '<td>' + d.description + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>URL:</td>' +
        '<td>' + d.link + '</td>' +
        '</tr>' +
        '</table>';
}
jQuery('.wineDbPopAction').on('click', function () {
    jQuery.getJSON("http://winedb.zeuslocker.com/data-tables.json", function (json) {
        var box = bootbox.dialog({
            show: false,
            message: '<table id="wineDataTablePopout" class="display responsive no-wrap" cellspacing="0" width="100%"></table>',
            title: "Wine Database",
            onEscape: true,
            backdrop: true,
            size: "large"
        });

        box.on("shown.bs.modal", function () {
            //.modal-fs-dialog {
            //modal-fs-content {
            jQuery('.modal-dialog').addClass('modal-fs-dialog');
            jQuery('.modal-content').addClass('modal-fs-content');
            // DataTable
            var popupTable = jQuery('#wineDataTablePopout').DataTable({
                data: json.data,
                stateSave: true,
                columns: [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": ''
                    },
                    {data: "name", title: "Name"},
                    {data: "color", title: "Color"},
                    {data: "variety", title: "Variety"},
                    {data: "price", title: "Price"},
                    {data: "abv", title: "ABV"},
                    {data: "region", title: "Region"},
                    {data: "sub_region", title: "Sub Region"},
                    {data: "eyes", title: "Eyes"},
                    {data: "nose", title: "Nose"},
                    {data: "mouth", title: "Mouth"},
                    {data: "producer", title: "Producer"},
                    {data: "vintage", title: "Vintage"}
                ],
                scrollY: '70vh',
                "scrollCollapse": true
            });

            jQuery('tbody#wineDataTablePopout').on('click', 'td.details-control', function () {
                var tr = jQuery(this).closest('tr');
                var row = popupTable.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });

        });
        box.modal('show');
    });
});