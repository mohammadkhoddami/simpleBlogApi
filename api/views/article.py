from rest_framework.viewsets import ModelViewSet
from core.models import Article
from core.serializer import ArticleSerialzier


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.select_related('category').all()
    serializer_class = ArticleSerialzier
