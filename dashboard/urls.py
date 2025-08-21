from django.urls import path
from dashboard.views import dahsboard_index
app_name = "departamento"
urlpatterns = [

   
   path('index', dahsboard_index, name='index')
   ]