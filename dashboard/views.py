from django.shortcuts import render

def dahsboard_index(request):

 return render(request, 'dashboard/index.html')