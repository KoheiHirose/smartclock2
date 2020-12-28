from django.shortcuts import render, get_object_or_404

# Create your views here.
def index(request):
	return render(request, 'smartclock/index.html', {})

def about(request):
    return render(request, 'smartclock/about.html' , {'about': about})