from django.db import models


class Member(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return self.email


class AuthToken(models.Model):
    key = models.CharField(max_length=40, unique=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='tokens')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.member.email}:{self.key[:6]}..."
