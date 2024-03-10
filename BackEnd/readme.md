Creating secret token using node
>node
>require('crypto').randomBytes(64).toString('hex')
