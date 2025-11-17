from rest_framework.authentication import BaseAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from .models import AuthToken


class MemberTokenAuthentication(BaseAuthentication):
    keyword = b'Token'

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if not auth:
            return None
        if auth[0].lower() != self.keyword.lower():
            return None
        if len(auth) == 1:
            raise AuthenticationFailed('Invalid token header. No credentials provided.')
        if len(auth) > 2:
            raise AuthenticationFailed('Invalid token header. Token string should not contain spaces.')
        key = auth[1].decode()
        try:
            token_obj = AuthToken.objects.select_related('member').get(key=key)
        except AuthToken.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')
        return (token_obj.member, token_obj)
