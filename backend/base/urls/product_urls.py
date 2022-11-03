from django.contrib import admin
from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('create/', views.createProduct, name='product_create'),
    path('upload/', views.uploadImage, name='image_upload'),
    path('delete/<str:pk>/', views.deleteProduct, name='product_delete'),
    path('update/<str:pk>/', views.updateProduct, name='product_update'),
    path('<str:pk>/reviews/', views.createProductReview, name='create_review'),
    path('<str:pk>/', views.getProduct, name='product'),
]