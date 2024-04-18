def login():
    senha1="1"
    token1="1"

    if autenticaLogin(token1,senha1):
       print("deu certo")

    else:
       print("erro de login")


def autenticaLogin(token,senha):
    if token==1 and senha==1:

        return True

    else:

     return False