import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // when this function gets called, we've validated JWT
    // we could add admin stuff here probably...
    //ValidatedUserType

    //TODO
    //fetch by username, isAdmin? allow : throw Exception
    console.log(payload.username);
    //throw new UnauthorizedException("Random shit");
    return { userId: payload.sub, username: payload.username };
  }
}
