from .models import Service

from rest_framework import serializers
from account.views import GetProfileByIdView, GetProfileByUsernameView


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('pk', 'name', 'photo', 'customer', 'price')


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('pk', 'name', 'slug', 'description', 'photo', 'customer', 'bids', 'price', 'active', 'updated')
        # readonly_fields = ('__all__')


    def to_representation(self, instance, *args, **kwargs):
        data = super().to_representation(instance)

        data['customer'] = GetProfileByIdView.as_view()(request=self.context['request']._request,
                                             pk=data['customer']).data

        bids_cur, data['bids'] = data['bids'], []
        for b in bids_cur:
            r = GetProfileByIdView.as_view()(request=self.context['request']._request,
                                             pk=b)

            # data['bids'].append(
            #     {
            #         'id': r.data['id'],
            #         'username': r.data['username']
            #     })
            data['bids'].append(
                {
                    'user': r.data
                })
        return data


class ServiceDetailEditDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('pk', 'name', 'description', 'photo', 'bids', 'price', 'active')
