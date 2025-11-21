"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorPreciousItemClassifyData = exports.RoleFavorActionClassifyData = exports.RoleFavorVoiceClassifyData = exports.RoleFavorExperienceClassifyData = exports.RoleFavorClassifyDataBase = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleFavorContentDataBase_1 = require("./RoleFavorContentDataBase");
class RoleFavorClassifyDataBase {
  constructor(t, a) {
    this.RoleId = 0;
    this.TitleTableId = "";
    this.ContentDataList = [];
    this.TitleTableId = t;
    this.RoleId = a;
  }
  GetContentDataList() {
    if (this.ContentDataList.length === 0) {
      this.InitContentDataList();
    }
    return this.ContentDataList;
  }
  GetContentDataByIndex(t) {
    if (!(t < 0) && !(t >= this.ContentDataList.length)) {
      return this.ContentDataList[t];
    }
  }
  SortContentDataList() {
    this.ContentDataList.sort((t, a) => {
      var e = this.GetItemStatus(t);
      var s = this.GetItemStatus(a);
      if (e !== s) {
        return s - e;
      } else {
        return t.ConfigId - a.ConfigId;
      }
    });
  }
  GetItemStatus(t) {
    var a;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId);
    if (e) {
      a = e.GetFavorData();
      if (t.FavorContentType === 3) {
        e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(e.GetRoleId(), t.ConfigId);
        return Number(e);
      } else {
        return a.GetFavorItemState(t.ConfigId, t.FavorContentType);
      }
    } else {
      return 0;
    }
  }
}
class RoleFavorExperienceClassifyData extends (exports.RoleFavorClassifyDataBase = RoleFavorClassifyDataBase) {
  constructor(t, a, e) {
    super(t, a);
    this.ocd = 1;
    this.ocd = e;
  }
  GetFavorTabType() {
    return 1;
  }
  InitContentDataList() {
    if (this.ocd === 1) {
      this.ncd();
    } else {
      this.scd();
    }
  }
  ncd() {
    this.ContentDataList.length = 0;
    this.ContentDataList.push(this.hcd(1));
    this.ContentDataList.push(this.hcd(2));
  }
  scd() {
    this.ContentDataList.length = 0;
    var a = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorStoryConfig(this.RoleId);
    var e = a.length;
    for (let t = 0; t < e; t++) {
      var s = a[t];
      this.ContentDataList.push(this.lcd(s));
    }
  }
  hcd(t) {
    var a = this.RoleId;
    var e = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(a);
    return new RoleFavorContentDataBase_1.RoleFavorRoleInfoContentData(a, t, e);
  }
  lcd(t) {
    return new RoleFavorContentDataBase_1.RoleFavorStoryContentData(this.RoleId, t);
  }
}
exports.RoleFavorExperienceClassifyData = RoleFavorExperienceClassifyData;
class RoleFavorVoiceClassifyData extends RoleFavorClassifyDataBase {
  constructor(t, a, e) {
    super(t, a);
    this.TypeParam = 1;
    this.TypeParam = e;
  }
  GetFavorTabType() {
    return 0;
  }
  InitContentDataList() {
    this.ContentDataList.length = 0;
    var a = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(this.RoleId, this.TypeParam);
    var e = a.length;
    for (let t = 0; t < e; t++) {
      var s = a[t];
      this.ContentDataList.push(this._cd(s));
    }
  }
  _cd(t) {
    return new RoleFavorContentDataBase_1.RoleFavorVoiceContentData(this.RoleId, this.TypeParam, t);
  }
}
exports.RoleFavorVoiceClassifyData = RoleFavorVoiceClassifyData;
class RoleFavorActionClassifyData extends RoleFavorClassifyDataBase {
  constructor(t, a, e) {
    super(t, a);
    this.TypeParam = 1;
    this.TypeParam = e;
  }
  GetFavorTabType() {
    return 2;
  }
  InitContentDataList() {
    this.ContentDataList.length = 0;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId);
    if (t) {
      var t = t.GetRoleSkinId();
      var a = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByRoleSkinId(t);
      var e = a.length;
      for (let t = 0; t < e; t++) {
        var s = a[t];
        this.ContentDataList.push(this.ucd(s));
      }
    }
  }
  ucd(t) {
    return new RoleFavorContentDataBase_1.RoleFavorActionContentData(this.RoleId, this.TypeParam, t);
  }
}
exports.RoleFavorActionClassifyData = RoleFavorActionClassifyData;
class RoleFavorPreciousItemClassifyData extends RoleFavorClassifyDataBase {
  constructor(t, a) {
    super(t, a);
  }
  GetFavorTabType() {
    return 3;
  }
  InitContentDataList() {
    this.ContentDataList.length = 0;
    var a = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(this.RoleId);
    var e = a.length;
    for (let t = 0; t < e; t++) {
      var s = a[t];
      this.ContentDataList.push(this.ccd(s));
    }
  }
  ccd(t) {
    return new RoleFavorContentDataBase_1.RoleFavorPreciousItemContentData(this.RoleId, t);
  }
}
exports.RoleFavorPreciousItemClassifyData = RoleFavorPreciousItemClassifyData;
//# sourceMappingURL=RoleFavorClassifyDataBase.js.map