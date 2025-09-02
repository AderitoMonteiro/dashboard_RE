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

          console.log(result)

           // myPieChart start
           let divPai = document.getElementById("cre_desc");
           let span = document.createElement("span");
           span.setAttribute( "class","mr-2");
           let itag;

           divPai.innerHTML = '';
          

          result.resultado.forEach(item => {

               itag = document.createElement("span");
               itag.setAttribute( "class","fas fa-circle text-primary");
               itag.setAttribute( "style","color:" +item.cor+ "!important;");
               itag.innerHTML=item.CRE_RELACIONADO;
               span.appendChild(itag);

           });

          divPai.appendChild(span);

          // END

          // c
          let CRE_R = document.getElementById("cre_relacionado");
          let h4;
          let span2;
          let progress;
          let progress_bar;
          let count=0;
      
          for (let item of result.resultado) {
             
              h4=document.createElement("h4");
              span2=document.createElement("span");

              h4.innerHTML=`${item.CRE_RELACIONADO} (${item.TotalRegistos})`;
              h4.setAttribute('class','small font-weight-bold')
              span2.setAttribute('class','float-right')
              span2.innerHTML=`${item.PerceRegistos}`+'%';
              h4.appendChild(span2);
              CRE_R.appendChild(h4);

              progress=document.createElement("div");
              progress_bar=document.createElement("div");

              progress.setAttribute('class','progress mb-4')
              progress_bar.setAttribute('class','progress-bar bg-danger')
              progress_bar.setAttribute('role','progressbar')
              progress_bar.setAttribute('style','width:'+`${item.PerceRegistos}`+'%;background-color:'+`${item.cor}`+'!important')
              progress_bar.setAttribute('aria-valuenow',`${item.PerceRegistos}`)
              progress_bar.setAttribute('aria-valuemin','0')
              progress_bar.setAttribute('aria-valuemax','100')

              count=count+Number(`${item.TotalRegistos}`);

              progress.appendChild(progress_bar);
              CRE_R.appendChild(progress);

          }
             console.log(count)
           //CRE_R.appendChild(progress);


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
