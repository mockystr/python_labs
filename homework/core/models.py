from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(max_length=200, verbose_name='Слаг')
    description = models.TextField(blank=True, verbose_name='Описание услуги')
    customer = models.ForeignKey(User,
                                 related_name='service_created',
                                 on_delete=models.CASCADE,
                                 verbose_name='Заказчик услуги')
    bids = models.ManyToManyField(User,
                                  related_name='service_bid',
                                  blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Цена услуги')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата последнего изменения')
    active = models.BooleanField(default=True, blank=False, verbose_name='Услуга активна')

    class Meta:
        ordering = ('name',)
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return "{} {}".format(self.name, self.customer)

    def get_absolute_url(self):
        return reverse('core:detail', args=[self.id, self.slug])
