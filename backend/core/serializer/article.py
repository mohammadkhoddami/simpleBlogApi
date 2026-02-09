from rest_framework import serializers


from core.models import Article

class ArticleSerialzier(serializers.ModelSerializer):
    category = serializers.CharField(source='category.title')
    class Meta:
        model = Article
        fields = '__all__'