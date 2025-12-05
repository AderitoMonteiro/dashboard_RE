from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt

def dahsboard_index(request):

    query_count_diaspora = '''
                              EXEC [dbo].[sp_registo_mes]
                           '''

  

    with connection.cursor() as cursor:
            cursor.execute(query_count_diaspora)
            colunas = [col[0] for col in cursor.description] 
            query_count = [dict(zip(colunas, row)) for row in cursor.fetchall()]



    print(query_count)


    return render(request, 'dashboard/index.html',{"count":query_count})
    

@csrf_exempt
def get_info_sign_month(request):


    if request.method == "POST":
            try:
                  query_info_sign_month = '''
                                          EXEC [dbo].[sp_registo_por_mes]
                                          ''' 
                  query_info_sign_cre = '''
                                          EXEC [dbo].[sp_registo_por_CRE_relatorio]
                                          ''' 
                  query_novo_registo = '''
                                          select * From VIEW_novo_registo

                                       ''' 
                  

                  with connection.cursor() as cursor:
                        cursor.execute(query_info_sign_month)
                        colunas = [col[0] for col in cursor.description] 
                        total_registo_mes = [dict(zip(colunas, row)) for row in cursor.fetchall()]
            
                  with connection.cursor() as cursor:
                        cursor.execute(query_info_sign_cre)
                        colunas = [col[0] for col in cursor.description] 
                        total_registo_cre = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                  with connection.cursor() as cursor:
                        cursor.execute(query_novo_registo)
                        colunas = [col[0] for col in cursor.description] 
                        novo_registo_cre = [dict(zip(colunas, row)) for row in cursor.fetchall()]



                  return JsonResponse({'resultado': total_registo_mes,'registo_total_cre': total_registo_cre,'novo_registo_cre': novo_registo_cre})

            except Exception as e:
              return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def get_info_sign_CRE(request):


    if request.method == "POST":
            try:
                  query_info_sign_cre = '''
                                          EXEC [dbo].[sp_registo_por_CRE]
                                          ''' 

                  with connection.cursor() as cursor:
                        cursor.execute(query_info_sign_cre)
                        colunas = [col[0] for col in cursor.description] 
                        total_registo_cre = [dict(zip(colunas, row)) for row in cursor.fetchall()]



                  return JsonResponse({'resultado': total_registo_cre})

            except Exception as e:
              return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@csrf_exempt
def get_evolution_month(request):


    if request.method == "POST":
      
            try:
                        if request.POST.get('CRE') != 'Todos':
                              query_info_sign_month = '''
                                                            SET LANGUAGE Portuguese;
                                                            select 
                                                            CRE,
                                                            mes,
                                                            sum(total) as total
                                                            from [dbo].[RELATORIO_RE] WHERE CRE=%s
                                                            GROUP BY CRE,mes
                                                            ORDER BY 
                                                            DATEPART(MONTH,  CAST('01 ' + mes + ' 2025' AS DATETIME));
                                                      ''' 

                              with connection.cursor() as cursor:
                                    cursor.execute(query_info_sign_month, [request.POST.get('CRE')])
                                    colunas = [col[0] for col in cursor.description] 
                                    total_registo_mes = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                              return JsonResponse({'resultado': total_registo_mes})
                        else:
                              query_info_sign_month = '''
                                                            EXEC [dbo].[sp_registo_por_mes]
                                                      ''' 

                              with connection.cursor() as cursor:
                                    cursor.execute(query_info_sign_month)
                                    colunas = [col[0] for col in cursor.description] 
                                    total_registo_mes = [dict(zip(colunas, row)) for row in cursor.fetchall()]

                              return JsonResponse({'resultado': total_registo_mes})

            except Exception as e:
              return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
