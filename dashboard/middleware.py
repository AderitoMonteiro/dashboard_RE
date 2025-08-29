from django.shortcuts import redirect
from django.conf import settings

# URLs que não precisam de login
EXEMPT_URLS = [
    '/auth/login/',
    '/auth/logout/',
    '/dashboard/sign_month/',
    '/dashboard/sign_cre/',
]

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path_info

        # Verifica se o user está logado
        if not request.user.is_authenticated:
            # Se a URL não estiver na lista de exceções e não for static/media
            if not any(path.startswith(url) for url in EXEMPT_URLS) and not path.startswith('/static/'):
                return redirect('/auth/login/')

        return self.get_response(request)
