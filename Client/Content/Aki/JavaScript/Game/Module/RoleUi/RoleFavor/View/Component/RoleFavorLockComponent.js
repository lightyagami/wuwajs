"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorLockComponent = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const RoleFavorDefine_1 = require("../../RoleFavorDefine");
const RoleFavorLockItem_1 = require("../../RoleFavorLockItem");
const RoleFavorViewComponentBase_1 = require("./RoleFavorViewComponentBase");
class RoleFavorLockComponent extends RoleFavorViewComponentBase_1.RoleFavorViewComponentBase {
  constructor() {
    super(...arguments);
    this.Sui = undefined;
    this.huo = [];
    this.x0d = () => new RoleFavorLockItem_1.RoleFavorLockItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.Sui = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.x0d, this.GetItem(5).GetOwner());
  }
  OnBeforeDestroy() {
    this._uo();
    this.huo = [];
  }
  OnSetData(e) {
    this.huo = [];
  }
  OnRefreshView() {
    this.Ubt();
    this.uuo();
    this.cuo();
  }
  _uo() {
    if (this.Sui) {
      this.Sui.ClearChildren();
      this.Sui = undefined;
    }
  }
  cuo() {
    this.huo = this.muo();
    this.Sui?.RefreshByData(this.huo);
  }
  Ubt() {
    var e = this.duo();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e);
  }
  uuo() {
    var e = this.GetItem(4);
    var t = this.GetItem(3);
    if (this.ContentData.FavorContentType === 3 && this.ContentData.FavorActionParamType === 1) {
      e.SetUIActive(true);
      t.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "FavorUnlockNewIdleAction");
    } else {
      e.SetUIActive(false);
      t.SetUIActive(false);
    }
  }
  duo() {
    let e = "";
    switch (this.ContentData.FavorContentType) {
      case 3:
        e = "FavorUnlockActionCondition";
        break;
      case 1:
      case 2:
        e = "FavorUnlockkStoryCondition";
        break;
      case 4:
        e = "FavorUnlockPreciousItemCondition";
        break;
      case 0:
        e = "FavorUnlockVoiceCondition";
    }
    return e;
  }
  muo() {
    var e = this.ContentData.ConfigId;
    var t = this.ContentData.ConfigConGroupId;
    return this.Cuo(e, t);
  }
  Cuo(i, e) {
    var o = [];
    var r = this.ContentData.RoleId;
    var a = this.ContentData.FavorContentType;
    var e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(e);
    if (e) {
      var n = e.GroupId;
      var s = n.length;
      for (let t = 0; t < s; t++) {
        var l = n[t];
        var h = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(l);
        let e = false;
        e = a === 3 ? ModelManager_1.ModelManager.MotionModel.IsCondtionFinish(r, i, l) : ModelManager_1.ModelManager.RoleFavorConditionModel.IsConditionFinish(r, a, i, l);
        l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Description);
        o.push(new RoleFavorDefine_1.RoleFavorLockItemData(!e, l ?? ""));
      }
    }
    return o;
  }
}
exports.RoleFavorLockComponent = RoleFavorLockComponent;
//# sourceMappingURL=RoleFavorLockComponent.js.map