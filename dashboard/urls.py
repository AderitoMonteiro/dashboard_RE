from django.urls import path
from dashboard.views import dahsboard_index,get_info_sign_month,get_info_sign_CRE,get_evolution_month
app_name = "dahsboard"
urlpatterns = [
     path('index', dahsboard_index, name='index'),
     path('sign_month', get_info_sign_month, name='sign_month'),
     path('sign_cre', get_info_sign_CRE, name='sign_cre'),
     path('inf_month_select', get_evolution_month, name='inf_month_select')
   ]