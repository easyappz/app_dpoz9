from django.contrib import admin
from .models import Member, AuthToken


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "created_at")
    search_fields = ("email",)


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("id", "member", "key", "created_at")
    search_fields = ("key", "member__email")
