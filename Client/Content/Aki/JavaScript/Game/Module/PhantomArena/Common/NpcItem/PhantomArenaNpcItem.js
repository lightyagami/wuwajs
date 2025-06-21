"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class NpcItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.ChallengeData = void 0, this.CallbackOnClick = void 0, this.kqe = () => {
      var t;
      this.CallbackOnClick && this.ChallengeData && (t = this.GetExtendToggle(0).GetToggleState(), this.CallbackOnClick(this.ChallengeData, this.GridIndex, t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.kqe]
    ]
  }
  OnStart() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.kqe)
  }
  Refresh(t, i, e) {
    this.ChallengeData = t;
    var s = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateById(t.Id),
      r = 0 === s,
      s = 2 === s,
      h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t.Id);
    this.SetSelected(i), this.GetTexture(5).SetUIActive(t.IsLast), this.GetTexture(2).SetUIActive(t.IsLast), this.GetTexture(1).SetUIActive(!t.IsLast), this.GetItem(7).SetUIActive(r && t.IsLast), this.GetItem(8).SetUIActive(!t.IsLast), this.GetItem(9).SetUIActive(s), LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), h.NpcName), this.TrySetTextureByPath(h.NpcIcon, this.GetTexture(3))
  }
  SetSelected(t) {
    var i = ModelManager_1.ModelManager.PhantomArenaModel.IsChallengeLock(this.ChallengeData?.Id ?? 0),
      i = i ? 2 : !i && t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(i, !1)
  }
  OnSelected(t) {
    this.SetSelected(!0)
  }
  OnDeselected(t) {
    this.SetSelected(!1)
  }
}
exports.NpcItem = NpcItem;
//# sourceMappingURL=PhantomArenaNpcItem.js.map