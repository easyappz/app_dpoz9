from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Member
        fields = ['email', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return Member.objects.create(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        try:
            member = Member.objects.get(email=email)
        except Member.DoesNotExist:
            raise serializers.ValidationError('Неверные учетные данные.')
        if not check_password(password, member.password):
            raise serializers.ValidationError('Неверные учетные данные.')
        attrs['member'] = member
        return attrs
