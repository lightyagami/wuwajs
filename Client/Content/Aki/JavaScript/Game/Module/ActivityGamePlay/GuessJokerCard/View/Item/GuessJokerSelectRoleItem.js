"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSelectRoleItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class GuessJokerSelectRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.yq = 0;
    this.rMt = undefined;
    this.kqe = () => {
      this.rMt?.(this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  get Level() {
    if (this.yq === 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerSelectRoleItem获取LevelId为0");
    }
    return this.yq;
  }
  Refresh(e, t, r) {
    this.yq = e;
    var o = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e).AiRole;
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
    this.SetRoleIcon(s.RoleHeadIconCircle, this.GetTexture(1), o);
    var s = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if (s && s.GetGuessJokerGameData(e)) {
      this.RefreshRedDot();
    }
  }
  RefreshRedDot() {
    var e;
    var t;
    var r;
    var o = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if (o &&= o.GetGuessJokerGameData(this.yq)) {
      e = o.Unlock;
      t = o.FirstPass;
      o = o.RewardGet;
      r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GuessJokerUnlockLevelClicked) ?? new Set();
      r = e && !t && !r.has(this.yq) || t && !o;
      this.GetItem(2).SetUIActive(r);
      this.GetSprite(4).SetUIActive(t && o);
      this.GetSprite(3).SetUIActive(!e);
    }
  }
  BindClickCallBack(e) {
    this.rMt = e;
  }
  OnSelected() {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  GuideGetToggleItem() {
    return this.GetExtendToggle(0)?.RootUIComp;
  }
}
exports.GuessJokerSelectRoleItem = GuessJokerSelectRoleItem;
//# sourceMappingURL=GuessJokerSelectRoleItem.js.map