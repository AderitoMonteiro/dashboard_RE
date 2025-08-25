from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt

def dahsboard_index(request):

    query_count_diaspora = '''
                              SELECT 
                              COUNT(*) AS total
                              FROM [dbo].[DASHBOARD_RE]
                           '''

    query_count_registo_novo = '''
                                    SELECT 
                                    count(*) as total
                                    FROM [dbo].[DASHBOARD_RE]
                                    where TIPO='NOVO REGISTO'       
                                 '''

    query_count_tranferencia = '''
                                    SELECT 
                                    count(*) as total
                                    FROM [dbo].[DASHBOARD_RE]
                                    where TIPO='TRANSFERENÇIA'       
                                 '''

    query_count_duplas = '''
                                    SELECT 
                                    count(*) as total
                                    FROM [dbo].[DASHBOARD_RE]
                                    where ESTADO='NÃO ELIMINADO'    
                                 '''

    query_count_percentagem_eliminado = '''
                                            EXEC sp_percentagem_eliminados   
                                         '''
    
    query_info_sign_cre = '''
                                          EXEC [dbo].[sp_registo_por_CRE_origem]
                                          ''' 

    with connection.cursor() as cursor:
            cursor.execute(query_info_sign_cre)
            colunas = [col[0] for col in cursor.description] 
            total_registo_cre = [dict(zip(colunas, row)) for row in cursor.fetchall()]

    with connection.cursor() as cursor:
          cursor.execute(query_count_diaspora)
          colunas = [col[0] for col in cursor.description] 
          total_registo_diaspora = [dict(zip(colunas, row)) for row in cursor.fetchall()]

    with connection.cursor() as cursor:
          cursor.execute(query_count_registo_novo)
          colunas = [col[0] for col in cursor.description] 
          total_registo_diaspora_novo = [dict(zip(colunas, row)) for row in cursor.fetchall()]


    with connection.cursor() as cursor:
          cursor.execute(query_count_tranferencia)
          colunas = [col[0] for col in cursor.description] 
          total_registo_diaspora_transferencia = [dict(zip(colunas, row)) for row in cursor.fetchall()]

    with connection.cursor() as cursor:
          cursor.execute(query_count_duplas)
          colunas = [col[0] for col in cursor.description] 
          total_registo_diaspora_dupla = [dict(zip(colunas, row)) for row in cursor.fetchall()]

    with connection.cursor() as cursor:
          cursor.execute(query_count_percentagem_eliminado)
          colunas = [col[0] for col in cursor.description] 
          total_registo_diaspora_percentagem_eliminado = [dict(zip(colunas, row)) for row in cursor.fetchall()]

          print (total_registo_diaspora_percentagem_eliminado)


    return render(request, 'dashboard/index.html',{"total_registo_diaspora":total_registo_diaspora,"total_registo_diaspora_novo":total_registo_diaspora_novo,"total_registo_diaspora_transferencia":total_registo_diaspora_transferencia,"total_registo_diaspora_dupla":total_registo_diaspora_dupla,"total_registo_diaspora_percentagem_eliminado":total_registo_diaspora_percentagem_eliminado,"total_registo_cre":total_registo_cre})

@csrf_exempt
def get_info_sign_month(request):


    if request.method == "POST":
            try:
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
