from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core.mail import send_mail

from config.settings import BASE_URL


class EmailResetPassword():
    def send(token, user):
        context = {
            'username': user.username,
            'email': user.email,
            'reset_password_url': str(BASE_URL) + "accounts/changer_password/" + token
        }

        email_html_message = render_to_string('emails/user_reset_password.html', context)


        msg = EmailMultiAlternatives(
            "Password Reset ",
            '',
            "ncrousset926@gmail.com",
            [user.email, 'natanael926@gmail.com']
        )

        msg.attach_alternative(email_html_message, "text/html")

        msg.send()
