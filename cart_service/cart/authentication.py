from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):

        user_id = validated_token.get("user_id")

        if user_id is None:
            raise AuthenticationFailed("Invalid token")

        # ✅ Proper dummy user
        class User:
            def __init__(self, id):
                self.id = id
                self.is_authenticated = True
                self.is_active = True

            def __str__(self):
                return f"User {self.id}"

        return User(user_id)