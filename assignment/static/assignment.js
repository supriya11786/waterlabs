function fetchData() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        fetch(`/get-data?start_date=${startDate}&end_date=${endDate}`)
            .then(response => response.json())
            .then(data => {
                // Example of rendering time series data
                var optionsTimeSeries = {
                    series: [{
                        name: 'Visitors',
                        data: data.time_series.map(item => item.visitors)
                    }],
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: true
                        }
                    },
                    xaxis: {
                        categories: data.time_series.map(item => item.arrival_date)
                    }
                };
                var chart = new ApexCharts(document.querySelector("#time-series-chart"), optionsTimeSeries);
                chart.render();

                // Example of rendering country data
                var optionsCountry = {
                    series: [{
                        name: 'Visitors',
                        data: data.countries.map(item => item.visitors)
                    }],
                    chart: {
                        type: 'bar'
                    },
                    xaxis: {
                        categories: data.countries.map(item => item.country)
                    }
                };
                var chartCountry = new ApexCharts(document.querySelector("#country-chart"), optionsCountry);
                chartCountry.render();
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert("Please select a date range.");
    }
}
