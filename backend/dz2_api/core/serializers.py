from .models import Service
from django.contrib.auth.models import User
from rest_framework import serializers
from account.views import GetProfileByIdView, GetProfileByUsernameView


class ServiceListSerializer(serializers.ModelSerializer):
    customer_username = serializers.SerializerMethodField('get_username')

    def get_username(self, obj):
        user_obj = User.objects.get(pk=obj.customer_id)
        return user_obj.username 

    class Meta:
        model = Service
        fields = ('pk', 'name', 'photo', 'customer', 'customer_username','price')


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
