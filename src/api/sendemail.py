# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_mail(to, template):
    message = Mail(
        from_email=os.environ.get('SEND_GRID_API_SENDER'),
        to_emails=to,
        subject=template['subject'],
        html_content=template['body'],
        )
    try:
        print(os.environ.get('SEND_GRID_API_KEY'))
        sg = SendGridAPIClient(os.environ.get('SEND_GRID_API_KEY'))
        
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return True
    except Exception as e:
        print(e)
        return False
def mail_recovery_template(token):
    frontend_url = os.environ.get('FRONT_END_URL')
    frontend_url = frontend_url + 'passwordChange/?token='+ token 
    body='<h1>Este correo es para recuperar tu cuenta</h1> <a href="'+ frontend_url + '">Recupera la Cuenta</a><p>Si no pediste un cambio de contraseña ignora este correo</p>'
    template={}
    template['body']=body
    template['subject']="Recuperación de contraseña"
    return template