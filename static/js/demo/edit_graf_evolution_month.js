


function handleClick(button) {

     let cre = button.getAttribute("data-info");
     let destaque = document.getElementById("context_grafico");
     destaque.innerHTML = `(Evolução Mensal - ${cre})`;
     var ano = document.getElementById("ano").value;

      if(ano == ""){ 

          ano = 2025;
          
      }


     const data = {
        "CRE": cre,
        "ano": ano
      };

     $.ajax({
        url: '../dashboard/inf_month_select',
        type: 'POST',
        data: data,
         success: function (data) {

          const jsonString = JSON.stringify(data);  
          const result = JSON.parse(jsonString); 

           let total_mes=[]

           for (let item of result.resultado) {
    
               total_mes.push(`${item.total}`)
              
             }
             
            var ctx = document.getElementById("grafic");  
             ctx.innerHTML='';

             let canvas= document.createElement("canvas");
             canvas.setAttribute( "id","myAreaChart");
             ctx.appendChild(canvas);
   
             var ctx = document.getElementById("myAreaChart");
             var meses;

                            if(ano==2025){

                                  meses=["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                            }else{

                                  meses=["Dec","jan", "Feb", "Mar", "Apr"];
                            }
                        
          
             var myLineChart = new Chart(ctx, {
                 type: 'line',
            
            data: {
                    labels: meses,
                    
                    
                    datasets: [{
                            label: "Earnings",
                            lineTension: 0.3,
                            backgroundColor: "rgba(78, 115, 223, 0.05)",
                            borderColor: "rgba(78, 115, 223, 1)",
                            pointRadius: 3,
                            pointBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointBorderColor: "rgba(78, 115, 223, 1)",
                            pointHoverRadius: 3,
                            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                            pointHitRadius: 10,
                            pointBorderWidth: 2,
                            data: total_mes,
                          }]
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
                          mode: 'Recense',   // tooltip pega apenas o ponto mais próximo
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

              }})
      }

function yearclick(button) {

        let ano = button.value;

        if(ano>0){
          
                    const data = {
                            "ano": ano
                          };

                          $.ajax({
                              url: '../dashboard/inf_month_select_year',
                              type: 'POST',
                              data: data,
                              success: function (data) {

                                

                        const jsonString = JSON.stringify(data);  
                        const result = JSON.parse(jsonString); 

                        let total_mes=[]

                        for (let item of result.resultado) {
                  
                            total_mes.push(`${item.total}`)
                            
                          }
                          
                          var ctx = document.getElementById("grafic");  
                          ctx.innerHTML='';

                          let canvas= document.createElement("canvas");
                          canvas.setAttribute( "id","myAreaChart");
                          ctx.appendChild(canvas);
                
                          var ctx = document.getElementById("myAreaChart");
                          var meses;

                            if(ano==2025){

                                  meses=["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                            }else{

                                  meses=["Dec","jan", "Feb", "Mar", "Apr"];
                            }
                        
                          var myLineChart = new Chart(ctx, {
                              type: 'line',
                          
                          data: {
                            labels: meses,
                            
                            
                            datasets: [{
                                    label: "Earnings",
                                    lineTension: 0.3,
                                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                                    borderColor: "rgba(78, 115, 223, 1)",
                                    pointRadius: 3,
                                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                                    pointBorderColor: "rgba(78, 115, 223, 1)",
                                    pointHoverRadius: 3,
                                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                                    pointHitRadius: 10,
                                    pointBorderWidth: 2,
                                    data: total_mes,
                                  }]
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
                                  mode: 'Recense',   // tooltip pega apenas o ponto mais próximo
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

              
                    }
            });
     }
                
 }