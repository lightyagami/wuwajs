"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionBlackBoardHelper = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbBlackBoardBoolean_1 = require("./FbBlackBoardBoolean");
const FbBlackBoardEntityId_1 = require("./FbBlackBoardEntityId");
const FbBlackBoardEntityPos_1 = require("./FbBlackBoardEntityPos");
const FbBlackBoardFloat_1 = require("./FbBlackBoardFloat");
const FbBlackBoardInt_1 = require("./FbBlackBoardInt");
const FbBlackBoardString_1 = require("./FbBlackBoardString");
const FbBlackBoardVector_1 = require("./FbBlackBoardVector");
class UnionBlackBoardHelper {
  static GetUnionBlackBoardObject(r) {
    switch (r) {
      case fb_var_1.UnionBlackBoard.BlackBoardBoolean:
        return new fb_var_1.BlackBoardBoolean();
      case fb_var_1.UnionBlackBoard.BlackBoardEntityId:
        return new fb_var_1.BlackBoardEntityId();
      case fb_var_1.UnionBlackBoard.BlackBoardEntityPos:
        return new fb_var_1.BlackBoardEntityPos();
      case fb_var_1.UnionBlackBoard.BlackBoardFloat:
        return new fb_var_1.BlackBoardFloat();
      case fb_var_1.UnionBlackBoard.BlackBoardInt:
        return new fb_var_1.BlackBoardInt();
      case fb_var_1.UnionBlackBoard.BlackBoardString:
        return new fb_var_1.BlackBoardString();
      case fb_var_1.UnionBlackBoard.BlackBoardVector:
        return new fb_var_1.BlackBoardVector();
      default:
        return;
    }
  }
  static ReadUnionBlackBoard(r, a) {
    if (a !== undefined) {
      switch (r) {
        case fb_var_1.UnionBlackBoard.BlackBoardBoolean:
          return FbBlackBoardBoolean_1.FbBlackBoardBoolean.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardEntityId:
          return FbBlackBoardEntityId_1.FbBlackBoardEntityId.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardEntityPos:
          return FbBlackBoardEntityPos_1.FbBlackBoardEntityPos.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardFloat:
          return FbBlackBoardFloat_1.FbBlackBoardFloat.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardInt:
          return FbBlackBoardInt_1.FbBlackBoardInt.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardString:
          return FbBlackBoardString_1.FbBlackBoardString.Create(a);
        case fb_var_1.UnionBlackBoard.BlackBoardVector:
          return FbBlackBoardVector_1.FbBlackBoardVector.Create(a);
        default:
          return;
      }
    }
  }
}
exports.UnionBlackBoardHelper = UnionBlackBoardHelper;
//# sourceMappingURL=UnionBlackBoardHelper.js.map