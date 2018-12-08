from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.validators import MinValueValidator
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


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


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True, verbose_name='Дата рождения')
    status = models.CharField(max_length=200, blank=True, verbose_name='Статус')
    photo = models.ImageField(upload_to='users/%Y', blank=True, verbose_name='Аватарка')

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return '{} profile'.format(self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
