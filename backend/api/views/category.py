from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request

from core.models import Category
from core.serializer import CategorySerialzier


class CategoryAPIView(APIView):
    serializer_class = CategorySerialzier
    
    def get(self, request: Request):
        qs = Category.objects.all()
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    