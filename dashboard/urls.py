from django.urls import path
from dashboard.views import dahsboard_index,get_info_sign_month,get_info_sign_CRE
app_name = "dahsboard"
urlpatterns = [
     path('index', dahsboard_index, name='index'),
     path('sign_month', get_info_sign_month, name='sign_month'),
     path('sign_cre', get_info_sign_CRE, name='sign_cre')
   ]