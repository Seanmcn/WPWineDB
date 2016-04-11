// Set width and height breakpoints.
var maxWidth = 500;
if (window.innerWidth < maxWidth) {
    maxWidth = window.innerWidth;
}

var maxHeight = 350;
if (window.innerHeight < maxHeight) {
    maxHeight = window.innerHeight - (window.innerHeight / 8);
}

var width = maxWidth,
    height = maxHeight + (maxHeight / 11 + 20),
    radius = Math.min(width, height - 20) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

// Mapping of step names to colors.
var colors = {
    "Red": "#DD1C1A",
    "White": "#00A6ED",
    "Rose": "#D90368",
    "N\A": "#000000"
};

var svg = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height + 20)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 ) + ")");

var partition = d3.layout.partition()
    .sort(null)
    .value(function (d) {
        return 1;
    });

var arc = d3.svg.arc()
    .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    })
    .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    })
    .innerRadius(function (d) {
        return Math.max(0, y(d.y));
    })
    .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
    });

// Keep track of the node that is currently being displayed as the root.
var node;

d3.json("//winedb.zeuslocker.com/data.json", function (error, root) {
    node = root;

    var data = svg.datum(root).selectAll("g")
        .data(partition.nodes(root));

    // First group should contain all items with a depth < 2.
    var group1 = data.enter().append("g").attr("class", "g-inner").filter(function (d) {
        return d.depth < 2;
    });

    // Append the item paths to group 1
    var path = group1.append("path")
        .attr("d", arc)
        .attr('id', function (d) {
            return "sunburst_" + d.name;
        })
        .style("fill", function (d) {
            if (d.color) {
                return d.color
            } else {
                return color((d.children ? d : d.parent).name)
            }
        })
        .on("click", click)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .each(stash);

    // Group 2 will contain all the rest of the items
    var group2 = data.enter().append("g").filter(function (d) {
        return d.depth >= 2;
    }).attr("class", "g-outer");

    // Append the item paths to group 2
    var path2 = group2.append("path")
        .attr("d", arc)
        .attr('id', function (d) {
            return "sunburst_" + d.name;
        })
        .style("fill", function (d) {
            if (colors[d.name]) {
                return colors[d.name]
            } else {
                return color((d.children ? d : d.parent).name)
            }
        })
        .on("click", click)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .each(stash);

    // Setting up the hover text SVG
    svg.append("svg:text")
        .attr("x", "0")
        //.attr("y", (maxHeight / 2) + (maxHeight / 12))
        .attr("y", 0)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", "0.7")
        .attr("font-size", "18")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("id", "sunburst_info");


    function click(d) {
        node = d;

        console.group("Item");
        console.log(d);
        console.groupEnd();

        // Transition the path unless we are hitting level 3 and then we want to stop.
        if (d.depth === 3) {
            path.transition()
                .duration(1000)
                .attrTween("d", arcTweenZoom(d.parent));

            path2.transition()
                .duration(1000)
                .attrTween("d", arcTweenZoom(d.parent));
        } else {
            path.transition()
                .duration(1000)
                .attrTween("d", arcTweenZoom(d));

            path2.transition()
                .duration(1000)
                .attrTween("d", arcTweenZoom(d));
        }

        // Hide things
        jQuery('#singleWine').hide();
        jQuery('.level-text-two').hide();

        if (d.depth === 3) {

            jQuery('#normalWindow').hide();
            jQuery('#singleWine #name .content').html(d.name).parent().show();
            if (d.price) {
                jQuery('#singleWine #price .content').html('$' + d.price).parent().show();
            }
            if (d.vintage && d.vintage !== 'N/A') {
                jQuery('#singleWine #vintage .content').html(d.vintage).parent().show();
            }
            if (d.eyes && d.eyes !== 'N/A') {
                jQuery('#singleWine #eyes .content').html(d.eyes).parent().show();
            }
            if (d.mouth && d.mouth !== 'N/A') {
                jQuery('#singleWine #mouth .content').html(d.mouth).parent().show();
            }
            if (d.nose && d.nose !== 'N/A') {
                jQuery('#singleWine #nose .content').html(d.nose).parent().show();
            }
            if (d.overall && d.overall !== 'N/A') {
                jQuery('#singleWine #overall .content').html(d.overall).parent().show();
            }
            if (d.harvested_from) {
                jQuery('#singleWine #link .content').html("<a class='breakLink' href='" + d.harvested_from + "' target='_blank'><i class='fa fa-link'></i></a>").parent().show();
            }
            jQuery('#sunburstViewInDB').data('name', d.name);
            jQuery('#singleWine #db_link').show();
            jQuery('#singleWine').show();
        }
        else if (d.depth === 2) {
            jQuery('#singleWine').hide();
            jQuery('#info_title').html();
            jQuery('#info_content').html("  <ul> " +
                "<li>Hover over sunburst areas to get section name</li>" +
                "<li>Click sunburst area to facet to that section</li> " +
                "<li>Clicking a wine will replace this text with the wine information.</li>" +
                " <li>At anytime you can click on the center of the sunburst to go up a level.</li>" +
                "</ul>");
        }
        else if (d.depth === 1) {
            jQuery('#singleWine').hide();
            jQuery('#info_title').html();
            jQuery('#info_content').html("  <ul> " +
                "<li>Hover over sunburst areas to get section name</li>" +
                "<li>Click sunburst area to facet to that section</li> " +
                "<li>Clicking a wine will replace this text with the wine information.</li>" +
                " <li>At anytime you can click on the center of the sunburst to go up a level.</li>" +
                "</ul>");
        }
        else {
            jQuery('.level-text-two').show();
            jQuery('#singleWine').hide();
            jQuery('#info_title').html();
            jQuery('#info_content').html("  <ul> " +
                "<li>Hover over sunburst areas to get section name</li>" +
                "<li>Click sunburst area to facet to that section</li> " +
                "<li>Clicking a wine will replace this text with the wine information.</li>" +
                " <li>At anytime you can click on the center of the sunburst to go up a level.</li>" +
                "</ul>");
            jQuery('#normalWindow').show();
        }
    }

    function mouseover(d) {
        // Fade all the segments.
        d3.selectAll("path")
            .style("opacity", 0.5);

        // Un-fade the path we've chosen
        d3.select("path").style("opacity", 1);

        // Then un-fade those that are an ancestor of the current segment.
        var sequenceArray = getAncestors(d);
        d3.selectAll("path")
            .filter(function (node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);

        // Hover text
        jQuery('#sunburst_info').html(d.name);
    }

    function mouseleave(d) {
        d3.selectAll("path").style("opacity", 1);
    }
});

d3.select(self.frameElement).style("height", height + "px");

// Given a node in a partition layout, return an array of all of its ancestor nodes, highest first, but excluding the root.
function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}

// Setup for switching data: stash the old values for transition.
function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
}

// When zooming: interpolate the scales.
function arcTweenZoom(d) {
    var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? (maxHeight / 10) : 0, radius]); //using max height to work out center
    return function (d, i) {
        return i
            ? function (t) {
            return arc(d);
        }
            : function (t) {
            x.domain(xd(t));
            y.domain(yd(t)).range(yr(t));
            return arc(d);
        };
    };
}

function calculateX(d) {
    //return x(d.x*Math.PI);
    return y(d.y);
}