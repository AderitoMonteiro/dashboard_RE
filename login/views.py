from django.contrib.auth import login, authenticate,logout
from django.shortcuts import render, redirect
from django.template import loader
from django.http import HttpResponse


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:

            login(request, user)
            return redirect('/dashboard/index')
           
        else:
            return render(request, 'auth/login.html', {'erro': 'Credenciais inválidas'})

    return render(request, 'auth/login.html')



def logout_view(request):
    logout(request)
    return redirect('../login')  # ou para a homepage, como preferires