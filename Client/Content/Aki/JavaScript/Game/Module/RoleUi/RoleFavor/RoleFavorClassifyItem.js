"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorClassifyItem = exports.initContentItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleFavorContentItem_1 = require("./RoleFavorContentItem");
const RoleFavorDefine_1 = require("./RoleFavorDefine");
const RoleFavorUtil_1 = require("./RoleFavorUtil");
const initContentItem = (e, t, i) => {
  return {
    Key: i,
    Value: new RoleFavorContentItem_1.RoleFavorContentItem(e, t)
  };
};
exports.initContentItem = initContentItem;
class RoleFavorClassifyItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.ContentGenericLayout = undefined;
    this.u_o = [];
    this.c_o = () => {
      this.u_o = this.m_o();
    };
    this.d_o = e;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText]];
  }
  OnStart() {
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, this.d_o.TitleTableId);
    this.c_o();
    this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(0), exports.initContentItem);
    this.ContentGenericLayout.RebuildLayoutByDataNew(this.u_o);
  }
  OnBeforeDestroy() {
    this.d_o = undefined;
    this.u_o = [];
  }
  m_o() {
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(this.d_o)) {
      return this.C_o();
    }
    var t = [];
    var i = this.d_o.RoleId;
    var r = this.d_o.TypeParam;
    var a = this.d_o.FavorTabType;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
    let o = undefined;
    switch (this.d_o.FavorTabType) {
      case 2:
        o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByRoleSkinId(e.GetRoleSkinId());
        break;
      case 1:
        o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorStoryConfig(i);
        break;
      case 3:
        o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(i);
        break;
      case 0:
        o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(i, r);
    }
    var n = o.length;
    for (let e = 0; e < n; e++) {
      var s = o[e];
      var s = new RoleFavorDefine_1.ContentItemData(a, i, s, r);
      t.push(s);
    }
    return t;
  }
  C_o() {
    var e = [];
    var t = this.g_o(1);
    var i = this.g_o(2);
    e.push(t, i);
    return e;
  }
  g_o(e) {
    var t = this.d_o.RoleId;
    var i = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(t);
    return new RoleFavorDefine_1.ContentItemData(1, t, i, e);
  }
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
//# sourceMappingURL=RoleFavorClassifyItem.js.map