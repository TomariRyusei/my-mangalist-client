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

  const [scheme, encoded] = authorization.split(" ");
  if (!encoded || scheme !== "Basic") {
    return new Response("Malformed authorization header.", { status: 400 });
  }

  const credentials = atob(encoded).split(":");
  const user = credentials[0];
  const pass = credentials[1];

  if (user !== BASIC_USER || pass !== BASIC_PASS) {
    return new Response("Invalid credentials.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected", charset="UTF-8"',
      },
    });
  }

  return await context.next();
}
