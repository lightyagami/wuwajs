"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClassifyData = exports.createContentHandler = exports.RoleFavorHintData = exports.RoleFavorLockItemData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const RoleFavorClassifyDataBase_1 = require("./Data/RoleFavorClassifyDataBase");
class RoleFavorLockItemData {
  constructor(e, t) {
    this.IsLock = false;
    this.Desc = StringUtils_1.EMPTY_STRING;
    this.IsLock = e;
    this.Desc = t;
  }
}
exports.RoleFavorLockItemData = RoleFavorLockItemData;
class RoleFavorHintData {
  constructor(e, t) {
    this.RoleConfig = undefined;
    this.Exp = 0;
    this.RoleConfig = e;
    this.Exp = t;
  }
}
function createContentHandler(e, t) {
  return {
    ShowItem: e,
    PlayContent: t
  };
}
function createClassifyData(e, t, a, s) {
  switch (t) {
    case 2:
      return new RoleFavorClassifyDataBase_1.RoleFavorActionClassifyData(e, a, s);
    case 1:
      return new RoleFavorClassifyDataBase_1.RoleFavorExperienceClassifyData(e, a, s);
    case 3:
      return new RoleFavorClassifyDataBase_1.RoleFavorPreciousItemClassifyData(e, a);
    case 0:
      return new RoleFavorClassifyDataBase_1.RoleFavorVoiceClassifyData(e, a, s);
    default:
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 78, "不支持的好感度类型", ["favorTabType", t]);
      }
      throw new Error("不支持的好感度类型");
  }
}
exports.RoleFavorHintData = RoleFavorHintData;
exports.createContentHandler = createContentHandler;
exports.createClassifyData = createClassifyData; //# sourceMappingURL=RoleFavorDefine.js.map