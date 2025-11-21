"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPreciousItemContentData = exports.RoleFavorActionContentData = exports.RoleFavorStoryContentData = exports.RoleFavorRoleInfoContentData = exports.RoleFavorVoiceContentData = exports.RoleFavorContentDataBase = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
class RoleFavorContentDataBase {
  constructor(t) {
    this.RoleId = 0;
    this.Ghi = 0;
    this.RoleId = t;
    this.Ghi = RoleFavorContentDataBase.dcd++;
  }
  get InstanceId() {
    return this.Ghi;
  }
  get Title() {
    if (this.TitleTextId === StringUtils_1.EMPTY_STRING) {
      return StringUtils_1.EMPTY_STRING;
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.TitleTextId);
    }
  }
  get Content() {
    if (this.ContentTextId === StringUtils_1.EMPTY_STRING) {
      return StringUtils_1.EMPTY_STRING;
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.ContentTextId);
    }
  }
  get FavorContentType() {
    return this.GetFavorContentType();
  }
}
(exports.RoleFavorContentDataBase = RoleFavorContentDataBase).dcd = 0;
class RoleFavorVoiceContentData extends RoleFavorContentDataBase {
  constructor(t, e, o) {
    super(t);
    this.FavorVoiceParamType = 1;
    this.ConfigData = undefined;
    this.FavorVoiceParamType = e;
    this.ConfigData = o;
  }
  get ConfigId() {
    return this.ConfigData.Id;
  }
  get ConfigConGroupId() {
    return this.ConfigData.CondGroupId;
  }
  get TitleTextId() {
    return this.ConfigData.Title;
  }
  get ContentTextId() {
    return this.ConfigData.Content;
  }
  GetFavorContentType() {
    return 0;
  }
}
exports.RoleFavorVoiceContentData = RoleFavorVoiceContentData;
class RoleFavorRoleInfoContentData extends RoleFavorContentDataBase {
  constructor(t, e, o) {
    super(t);
    this.ConfigData = undefined;
    this.FavorExperienceSubType = 1;
    this.FavorExperienceSubType = e;
    this.ConfigData = o;
  }
  get ConfigId() {
    return this.ConfigData.Id;
  }
  get ConfigConGroupId() {
    return this.ConfigData.CondGroupId;
  }
  get TitleTextId() {
    return StringUtils_1.EMPTY_STRING;
  }
  get ContentTextId() {
    return StringUtils_1.EMPTY_STRING;
  }
  GetFavorContentType() {
    return 1;
  }
}
exports.RoleFavorRoleInfoContentData = RoleFavorRoleInfoContentData;
class RoleFavorStoryContentData extends RoleFavorContentDataBase {
  constructor(t, e) {
    super(t);
    this.ConfigData = undefined;
    this.FavorExperienceSubType = 3;
    this.ConfigData = e;
  }
  get ConfigId() {
    return this.ConfigData.Id;
  }
  get ConfigConGroupId() {
    return this.ConfigData.CondGroupId;
  }
  get TitleTextId() {
    return this.ConfigData.Title;
  }
  get ContentTextId() {
    return this.ConfigData.Content;
  }
  GetFavorContentType() {
    return 2;
  }
}
exports.RoleFavorStoryContentData = RoleFavorStoryContentData;
class RoleFavorActionContentData extends RoleFavorContentDataBase {
  constructor(t, e, o) {
    super(t);
    this.FavorActionParamType = 1;
    this.ConfigData = undefined;
    this.FavorActionParamType = e;
    this.ConfigData = o;
  }
  get ConfigId() {
    return this.ConfigData.Id;
  }
  get ConfigConGroupId() {
    return this.ConfigData.CondGroupId;
  }
  get TitleTextId() {
    return this.ConfigData.Title;
  }
  get ContentTextId() {
    return this.ConfigData.Content;
  }
  GetFavorContentType() {
    return 3;
  }
}
exports.RoleFavorActionContentData = RoleFavorActionContentData;
class RoleFavorPreciousItemContentData extends RoleFavorContentDataBase {
  constructor(t, e) {
    super(t);
    this.ConfigData = undefined;
    this.ConfigData = e;
  }
  get ConfigId() {
    return this.ConfigData.Id;
  }
  get ConfigConGroupId() {
    return this.ConfigData.CondGroupId;
  }
  get TitleTextId() {
    return this.ConfigData.Title;
  }
  get ContentTextId() {
    return this.ConfigData.Content;
  }
  GetFavorContentType() {
    return 4;
  }
}
exports.RoleFavorPreciousItemContentData = RoleFavorPreciousItemContentData;
//# sourceMappingURL=RoleFavorContentDataBase.js.map