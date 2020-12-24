import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '_fi!loe0po&%^tv7bi3-jkvpcz_d5^h+@0rd^8vvut)-m3=2p1'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

AUTH_USER_MODEL = 'accounts.User'
ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_registration',
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'django.contrib.sites',
    'accounts',
    'posts',
    'events',
]

SITE_ID = 1
MIDDLEWARE = [
    # 'django.middleware.cache.UpdateCacheMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
]

CORS_ORIGIN_ALLOW_ALL=False
CORS_ORIGIN_WHITELIST=(
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',

)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny', ), 

}

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'accounts.serializers.CustomUserDetailsSerializer',
    'LOGIN_SERIALIZER': 'accounts.serializers.AccountLoginSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "accounts.serializers.AccountRegistrationSerializer",
}

ROOT_URLCONF = 'Bgclub.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),
                 os.path.join(BASE_DIR, 'your_app_name', 'templates')],

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Bgclub.wsgi.application'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'app.comu2020@gmail.com'
EMAIL_HOST_PASSWORD = 'guvmttcwjmbtlnao'
EMAIL_PORT = 587

REST_REGISTRATION = {
    'REGISTER_VERIFICATION_ENABLED': False,
    'REGISTER_EMAIL_VERIFICATION_ENABLED': False,
    'RESET_PASSWORD_VERIFICATION_ENABLED': False,
}


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'TIMEOUT': 86400,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}


DATABASES = {
     'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'bgclubdbb',
        'USER': 'bgclub',
        'PASSWORD': 'bgclub20',
        'HOST': 'localhost',
        'PORT': '5432',
    }

}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

MEDIA_ROOT  = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'