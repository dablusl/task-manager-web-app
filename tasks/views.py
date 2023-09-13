from rest_framework import viewsets
from .serializer import TasksSerializer
from .models import Task

class TaskView (viewsets.ModelViewSet) :
    serializer_class = TasksSerializer
    queryset = Task.objects.all()

