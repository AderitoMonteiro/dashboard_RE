// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
$.ajax({
        url: '../dashboard/sign_cre',
        type: 'POST',
        success: function (data) {

          const jsonString = JSON.stringify(data);  
          const result = JSON.parse(jsonString); 
          console.log(result.resultado.map(item => item.CRE_RELACIONADO))


          var ctx = document.getElementById("myPieChart");
          var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: result.resultado.map(item => item.CRE_RELACIONADO),
              datasets: [{
                data: result.resultado.map(item => item.TotalRegistos),
                backgroundColor: result.resultado.map(item => item.cor),
                hoverBackgroundColor: result.resultado.map(item => item.cor),
                hoverBorderColor: "rgba(234, 236, 244, 1)",
              }],
            },
            options: {
              maintainAspectRatio: false,
              tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
              },
              legend: {
                display: false
              },
              cutoutPercentage: 80,
            },
          });
            },
        error: function (xhr, status, error) {
         
        }
  });
