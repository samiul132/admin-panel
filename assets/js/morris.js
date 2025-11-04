$(window).on('load', function() {
    setTimeout(initializeCharts, 100);
});

function initializeCharts() {
    // Line Chart
    if ($('#morris-line-example').length) {
        Morris.Line({
            element: 'morris-line-example',
            data: [
                { year: '2013', value: 50 },
                { year: '2014', value: 80 },
                { year: '2015', value: 120 },
                { year: '2016', value: 150 },
                { year: '2017', value: 180 },
                { year: '2018', value: 160 },
                { year: '2019', value: 200 }
            ],
            xkey: 'year',
            ykeys: ['value'],
            labels: ['Value'],
            lineColors: ['#3b82f6'],
            lineWidth: 3,
            pointSize: 5,
            gridTextColor: '#6b7280',
            gridTextSize: 12,
            resize: true,
            ymax: 200,
            ymin: 0
        });
    }

    if ($('#morris-bar-example').length) {
        Morris.Bar({
            element: 'morris-bar-example',
            data: [
                { y: '2013', a: 100 },
                { y: '2015', a: 75 },
                { y: '2017', a: 50 },
                { y: '2019', a: 150 }
            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Value'],
            barColors: ['#8b5cf6'],
            gridTextColor: '#6b7280',
            gridTextSize: 12,
            resize: true,
            ymax: 200,
            ymin: 0
        });
    }

    if ($('#morris-area-example').length) {
        Morris.Area({
            element: 'morris-area-example',
            data: [
                { y: '2013', a: 50, b: 80 },
                { y: '2014', a: 130, b: 100 },
                { y: '2015', a: 80, b: 60 },
                { y: '2016', a: 150, b: 190 },
                { y: '2017', a: 200, b: 150 },
                { y: '2018', a: 180, b: 220 },
                { y: '2019', a: 250, b: 200 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            lineColors: ['#10b981', '#f59e0b'],
            fillOpacity: 0.2,
            gridTextColor: '#6b7280',
            gridTextSize: 12,
            resize: true,
            ymax: 300,
            ymin: 0
        });
    }

    if ($('#morris-donut-example').length) {
        Morris.Donut({
            element: 'morris-donut-example',
            data: [
                {label: "Vivo Mobiles", value: 20},
                {label: "Samsung Mobiles", value: 35},
                {label: "Apple iPhones", value: 25},
                {label: "Other Brands", value: 20}
            ],
            colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
            resize: true,
            formatter: function (y) { return y + "%" }
        });
    }

    if ($('#line-chart-updating').length) {
        var nReloads = 0;
        
        function data(offset) {
            var ret = [];
            for (var x = 0; x <= 360; x += 10) {
                var v = (offset + x) % 360;
                ret.push({
                    x: x,
                    y: Math.sin(Math.PI * v / 180).toFixed(4),
                    z: Math.cos(Math.PI * v / 180).toFixed(4)
                });
            }
            return ret;
        }

        var graph = Morris.Line({
            element: 'line-chart-updating',
            data: data(0),
            xkey: 'x',
            ykeys: ['y', 'z'],
            labels: ['sin()', 'cos()'],
            lineColors: ['#3b82f6', '#8b5cf6'],
            parseTime: false,
            ymin: -1.0,
            ymax: 1.0,
            hideHover: true,
            gridTextColor: '#6b7280',
            gridTextSize: 12,
            resize: true
        });

        function update() {
            nReloads++;
            graph.setData(data(5 * nReloads));
        }

        setInterval(update, 100);
    }
}

$(window).on('resize', function() {
    setTimeout(initializeCharts, 300);
});