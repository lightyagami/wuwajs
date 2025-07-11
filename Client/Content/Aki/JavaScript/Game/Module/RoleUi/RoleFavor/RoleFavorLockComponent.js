"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorLockComponent = exports.initLockItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleFavorDefine_1 = require("./RoleFavorDefine");
const RoleFavorLockItem_1 = require("./RoleFavorLockItem");
const initLockItem = (e, t, i) => {
  return {
    Key: i,
    Value: new RoleFavorLockItem_1.RoleFavorLockItem(t, e)
  };
};
exports.initLockItem = initLockItem;
class RoleFavorLockComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.Sui = undefined;
    this.huo = [];
    this.luo = t;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.nOe();
  }
  OnBeforeDestroy() {
    this.luo = undefined;
    this._uo();
    this.huo = [];
  }
  Refresh(e) {
    this.luo = e;
    this._uo();
    this.huo = [];
    this.nOe();
  }
  nOe() {
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
    this.Sui = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(0), exports.initLockItem, this.GetItem(5));
    this.huo = this.muo();
    this.Sui.RebuildLayoutByDataNew(this.huo);
  }
  Ubt() {
    var e = this.duo();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e);
  }
  uuo() {
    var e = this.GetItem(4);
    var t = this.GetItem(3);
    if (this.luo.FavorTabType === 2 && this.luo.TypeParam === 1) {
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
    switch (this.luo.FavorTabType) {
      case 2:
        e = "FavorUnlockActionCondition";
        break;
      case 1:
        e = "FavorUnlockkStoryCondition";
        break;
      case 3:
        e = "FavorUnlockPreciousItemCondition";
        break;
      case 0:
        e = "FavorUnlockVoiceCondition";
    }
    return e;
  }
  muo() {
    let e = [];
    var t = this.luo.Config;
    var i = this.luo.FavorTabType;
    var o = t.Id;
    var t = t.CondGroupId;
    return e = i !== 2 && i !== 1 && i !== 3 && i !== 0 ? e : this.Cuo(o, t);
  }
  Cuo(i, e) {
    var o = [];
    var r = this.luo.RoleId;
    var a = this.luo.FavorTabType;
    var e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(e);
    if (e) {
      var s = e.GroupId;
      var n = s.length;
      for (let t = 0; t < n; t++) {
        var l = s[t];
        var h = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(l);
        let e = false;
        e = a === 2 ? ModelManager_1.ModelManager.MotionModel.IsCondtionFinish(r, i, l) : ModelManager_1.ModelManager.RoleFavorConditionModel.IsCondtionFinish(r, a, i, l);
        l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Description);
        o.push(new RoleFavorDefine_1.RoleFavorLockItemData(!e, l ?? ""));
      }
    }
    return o;
  }
}
exports.RoleFavorLockComponent = RoleFavorLockComponent;
//# sourceMappingURL=RoleFavorLockComponent.js.map