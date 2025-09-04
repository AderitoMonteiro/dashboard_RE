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

              count=count+1;

              progress.appendChild(progress_bar);
              CRE_R.appendChild(progress);

          }


            let title_dv = document.getElementById("cre_relacionado_title");
            let title_CREO = document.createElement("h6");
            title_CREO.setAttribute('class','m-0 font-weight-bold text-primary')
            title_CREO.innerHTML='CRE RELACIONADO ('+count+')';
            title_dv.appendChild(title_CREO);

            },
        error: function (xhr, status, error) {
         
        }
  });
