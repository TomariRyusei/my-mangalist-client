export async function onRequest(context) {
  const BASIC_USER = context.env.BASIC_USER;
  const BASIC_PASS = context.env.BASIC_PASS;

  const authorization = context.request.headers.get("Authorization");

  if (!authorization) {
    return new Response("You need to login.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
      },
    });
  }

  if (!authorization.startsWith("Basic ")) {
    return new Response("Malformed authorization header.", { status: 400 });
  }
  const encoded = authorization.substring(6);

  let credentials;
  try {
    credentials = atob(encoded);
  } catch (error) {
    return new Response("Invalid encoding in Authorization header.", { status: 400 });
  }

  const credentialsArray = credentials.split(":");
  const user = credentialsArray[0];
  const pass = credentialsArray[1];

  if (user !== BASIC_USER || pass !== BASIC_PASS) {
    return new Response("Invalid credentials.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
      },
    });
  }

  return context.next();
}
