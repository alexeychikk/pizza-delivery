import { AuthError, ForbiddenError } from "@src/errors";
import { PublicUser } from "@src/services/UserService";
import { AppRequest, AppRoutePreHandler } from "@src/types";

export const authenticate: AppRoutePreHandler = async (request) => {
  if (!request.session.user) {
    throw new AuthError();
  }
};

export const authenticateById: AppRoutePreHandler = async (
  request,
  reply,
  done,
) => {
  await authenticate(request, reply, done);

  const { id } = request.params as { id: string };
  if (id !== request.session.user._id) {
    throw new ForbiddenError();
  }
};

export const saveUserSession = (request: AppRequest, user: PublicUser) => {
  request.session.user = { _id: user._id, email: user.email };
};

export const logout = async (request: AppRequest) => {
  return new Promise<void>((resolve, reject) => {
    request.destroySession((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
