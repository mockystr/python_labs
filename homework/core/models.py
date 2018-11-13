from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.validators import MinValueValidator


class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(max_length=200, verbose_name='Слаг', db_index=True)
    description = models.TextField(blank=True, verbose_name='Описание услуги')
    photo = models.ImageField(default='../static/images/not_found.jpg',
                              upload_to='services/%Y',
                              verbose_name='Картинка услуги')
    customer = models.ForeignKey(User,
                                 related_name='service_created',
                                 on_delete=models.CASCADE,
                                 verbose_name='Заказчик услуги')
    bids = models.ManyToManyField(User,
                                  related_name='service_bid',
                                  blank=True)
    price = models.DecimalField(max_digits=10,
                                decimal_places=2,
                                verbose_name='Цена услуги',
                                validators=[MinValueValidator(0.01)])
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата последнего изменения')
    active = models.BooleanField(default=True, blank=False, verbose_name='Услуга активна')

    class Meta:
        ordering = ('-updated',)
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return "{} {}".format(self.name, self.customer)

    def get_absolute_url(self):
        return reverse('core:detail', args=[self.id, self.slug])
