from rest_framework.viewsets import ModelViewSet
from core.models import Article
from core.serializer import ArticleSerialzier


class ArticleViewSet(ModelViewSet):
    serializer_class = ArticleSerialzier
    lookup_field = 'slug'

    def get_queryset(self):
        qs = Article.objects.select_related('category').all()

        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__title=category)

        return qs