from django.shortcuts import get_object_or_404
from django.template.defaultfilters import slugify
from django.http import Http404

from .serializers import ServiceListSerializer, ServiceDetailSerializer, ServiceDetailEditDeleteSerializer
from .models import Service
from .permissions import IsOwnerOrReadOnly
# from account.views import GetProfileByIdView

from unidecode import unidecode
import requests

from rest_framework import permissions
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     CreateAPIView,
                                     UpdateAPIView,
                                     DestroyAPIView
                                     )
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import (TokenAuthentication,
    # SessionAuthentication,
    # BaseAuthentication,
    # BasicAuthentication
                                           )


# class MultipleFieldLookupMixin(object):
#     def get_object(self):
#         queryset = self.get_queryset()  # Get the base queryset
#         queryset = self.filter_queryset(queryset)  # Apply any filter backends
#         filter = {}
#         for field in self.lookup_fields:
#             filter[field] = self.kwargs[field]
#         return get_object_or_404(queryset, **filter)  # Lookup the object


class ServiceListView(ListAPIView):
    queryset = Service.objects.filter(active=True)
    serializer_class = ServiceListSerializer
    # authentication_classes = (TokenAuthentication,)


class ServiceMineListView(ListAPIView):
    serializer_class = ServiceListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Service.objects.filter(customer=self.request.user)


class ServiceDetailView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ServiceDetailSerializer

    queryset = Service.objects.filter(active=True)

    # authentication_classes = (SessionAuthentication,
    #                           # BasicAuthentication,
    #                           # TokenAuthentication
    #                           )

    # queryset = Service.objects.all()


class ServiceUpdateView(UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated,)

    queryset = Service.objects.all()
    serializer_class = ServiceDetailEditDeleteSerializer


class ServiceDeleteView(DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated,)

    queryset = Service.objects.all()
    serializer_class = ServiceDetailSerializer


class ServiceCreateView(CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Service.objects.all()
    serializer_class = ServiceDetailEditDeleteSerializer

    # def post(self, request, *args, **kwargs):
    #     request.POST._mutable = True
    #
    #     request.data['customer'] = request.user
    #     request.data['slug'] = slugify(unidecode(request.data['name']))
    #
    #     return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class AddToBidsView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = Service.objects.all()
    serializer_class = ServiceDetailEditDeleteSerializer

    def post(self, request, pk):
        obj = Service.objects.get(pk=pk)
        obj.bids.add(request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
