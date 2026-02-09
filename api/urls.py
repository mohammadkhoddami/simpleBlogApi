from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.category import CategoryAPIView
from .views.article import ArticleViewSet


router = DefaultRouter()
router.register(r'article', ArticleViewSet, basename='article')


urlpatterns = [
    path('category/', CategoryAPIView.as_view(), name='category'),
    path("", include(router.urls))
]
