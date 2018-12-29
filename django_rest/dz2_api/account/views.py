from django.shortcuts import get_object_or_404
from django.contrib.auth import (login as django_login,
                                 logout as django_logout)
from django.contrib.auth.models import User

from .permissions import IsCurrentUserOrReadOnly
from .serializers import LoginSerializer, UserSerializer, ProfileUserSerializer

from rest_framework import status
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import UpdateAPIView, RetrieveAPIView, DestroyAPIView


# from rest_framework import status
class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        django_login(request, user=user)

        token, created = Token.objects.get_or_create(user=user)

        return Response({"token": token.key}, status=200)


class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        django_logout(request)

        return Response(status=204)


class ProfileUpdateView(UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsCurrentUserOrReadOnly, permissions.IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = ProfileUserSerializer

    # def patch(self, request):
    #     print('')
    #     print('')
    #     print('PATCH')
    #     print('')
    #     print('')
    #     print(request.data)
    #     print('')
    #     print('')
    #     request.data['user_id'] = request.user
    #     print(request.data)
    #     print('')
    #     print('')
    #
    #     profile_ser = ProfileUserSerializer(data=request.data)
    #     if profile_ser.is_valid():
    #         profile = profile_ser.save()
    #         if profile:
    #             return Response(profile_ser.data, status=status.HTTP_200_OK)
    #
    #     return Response(profile_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # def put(self, request):
    #     print('')
    #     print('')
    #     print('PUT')
    #     print('')
    #     print('')
    #
    #     profile_ser = ProfileUserSerializer(data=request.data)
    #     if profile_ser.is_valid():
    #         profile = profile_ser.save()
    #         if profile:
    #             return Response(profile_ser.data, status=status.HTTP_200_OK)
    #
    #     return Response(profile_ser.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class GetProfileView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProfileUserSerializer
    lookup_field = 'username'

    queryset = User.objects.filter(is_active=True)

    def to_representation(self, instance):
        representation = {
            '123': '123332'
        }

        return representation
    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     # qs.profile = self.request.user.profile
    #     print(self.request.user.profile.__dict__)
    #     return qs


class UserDeleteView(DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsCurrentUserOrReadOnly, permissions.IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserSerializer
