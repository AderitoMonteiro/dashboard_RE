// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

$.ajax({
        url: '../dashboard/sign_month',
        type: 'POST',
        success: function (data) {

          const jsonString = JSON.stringify(data);  
          const result = JSON.parse(jsonString); 
   
          console.log(result.resultado)

          let cre=[];
          let cre1=[];
          let data_grafico=[];
          let cor_grafico=[];
          let percentagem_grafico=[];
          let x=0

          for (let item of result.resultado) {
  
            if(!cre.some(obj => obj.hasOwnProperty(`${item.CRE_RELACIONADO}`))){

                  cre.push({[`${item.CRE_RELACIONADO}`]:  [`${item.TotalRegistos}`] });
                  cor_grafico.push({[`${item.CRE_RELACIONADO}`]: `${item.cor}` });
                  percentagem_grafico.push({[`${item.CRE_RELACIONADO}`]: [`${item.PerceRegistos}`] });

            }else{

                  let objComChave = cre.find(obj => obj.hasOwnProperty(`${item.CRE_RELACIONADO}`));
                  objComChave[`${item.CRE_RELACIONADO}`].push(`${item.TotalRegistos}`);

                  let objCom= percentagem_grafico.find(obj => obj.hasOwnProperty(`${item.CRE_RELACIONADO}`));
                  objCom[`${item.CRE_RELACIONADO}`].push(`${item.PerceRegistos}`);

            }
            
          }

         console.log(percentagem_grafico)

         cre.forEach(obj => {
              Object.entries(obj).forEach(([chave, valores]) => {

                 let item = cor_grafico.find(obj => obj.hasOwnProperty(chave));
                 let percentagem = percentagem_grafico.find(obj => obj.hasOwnProperty(chave));

                 console.log('soma percentagem '+ parseFloat(percentagem[chave].reduce((a, b) => a + Number(b), 0).toFixed(2)))

                 data_grafico.push({
                            label: 'Recenseado '+ chave,
                            lineTension: 0.3,
                            backgroundColor: "rgba(78, 115, 223, 0.05)",
                            borderColor: item[chave],
                            pointRadius: 3,
                            pointBackgroundColor: item[chave],
                            pointBorderColor: item[chave],
                            pointHoverRadius: 3,
                            pointHoverBackgroundColor: item[chave],
                            pointHoverBorderColor: item[chave],
                            pointHitRadius: 10,
                            pointBorderWidth: 2,
                            data: valores // transforma cada item em TotalRegistos
                        });

                });
          });

          let cre_piza=[]
          let cre_cor=[]
          let cre_total=[]

           // myPieChart start
           let divPai = document.getElementById("cre_desc");
           let span = document.createElement("span");
           span.setAttribute( "class","mr-2");
           let itag;

            cre.forEach(obj => {
                 Object.entries(obj).forEach(([chave, valores]) => {

                let item = cor_grafico.find(obj => obj.hasOwnProperty(chave));

                cre_piza.push(chave)
                cre_total.push(obj[chave].reduce((a, b) => a + Number(b), 0))
                cre_cor.push(item[chave])


               divPai.innerHTML = '';
          

              itag = document.createElement("span");
              itag.setAttribute( "class","fas fa-circle text-primary");
              itag.setAttribute( "style","color:" +item[chave]+ "!important;");
              itag.innerHTML=chave;
              span.appendChild(itag);

                       });
              });

            divPai.appendChild(span);


          // Area Chart Example
          var ctx = document.getElementById("myAreaChart");
          var myLineChart = new Chart(ctx, {
            type: 'line',
            
            data: {
              labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              
              
              datasets: data_grafico,
            },
            options: {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                },
                interaction: {
                    mode: 'nearest',   // tooltip pega apenas o ponto mais próximo
                    intersect: true    // só dispara se o mouse estiver sobre o ponto
                },
                 plugins: {
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              // retorna apenas o valor do dataset atual
                              return `${context.dataset.label}: ${context.parsed.y}`;
                          }
                      }
                  }
              }
              },
              scales: {
                xAxes: [{
                  time: {
                    unit: 'date'
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    maxTicksLimit: 7
                  }
                }],
                yAxes: [{
                  ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return number_format(value);
                    }
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                  }
                }],
              },
              legend: {
                display: false
              },
              tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                caretPadding: 10,
                callbacks: {
                  label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                  }
                }
              }
            }
          });


          
           //CRE_R.appendChild(progress);

          var ctx = document.getElementById("myPieChart");
          var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: cre_piza,
              datasets: [{
                data: cre_total,
                backgroundColor: cre_cor,
                hoverBackgroundColor: cre_cor,
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


        myLineChart.update();

        },
        error: function (xhr, status, error) {
         
        }
  });


