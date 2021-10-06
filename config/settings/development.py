from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env("ALLOWED_HOSTS").split(" ")


DJANGO_APPS += [

]

THIRD_PARTY_APPS = [

]

LOCAL_APPS = []


INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'doctornote',
        'USER': 'doctornote_dev',
        'PASSWORD': 'Jonathan0220',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
