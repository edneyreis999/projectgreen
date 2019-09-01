import { AuthenticatedMiddleware, EndpointInfo, EndpointMetadata, OverrideMiddleware, Req } from "@tsed/common";
import { Unauthorized } from "ts-httpexceptions";
import { $log } from "ts-log-debug";

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthenticationMiddleware {
  public use(@EndpointInfo() endpoint: EndpointMetadata, @Req() request: Express.Request) { // next is optional here
    //retrieve Options passed to the Authenticated() decorators.
    const options = endpoint.store.get(AuthenticatedMiddleware) || {};
    $log.info("AuthenticationMiddleware =>", options);
    $log.info("AuthenticationMiddleware isAuthenticated ? =>", request.isAuthenticated());

    if (!request.isAuthenticated()) {
      throw new Unauthorized("Unauthorized");
    }
  }
}