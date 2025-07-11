"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class NpcItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ChallengeData = undefined;
    this.CallbackOnClick = undefined;
    this.kqe = () => {
      var t;
      if (this.CallbackOnClick && this.ChallengeData) {
        t = this.GetExtendToggle(0).GetToggleState();
        this.CallbackOnClick(this.ChallengeData, this.GridIndex, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIText], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.kqe);
  }
  Refresh(t, i, e) {
    this.ChallengeData = t;
    var s = ModelManager_1.ModelManager.PhantomArenaModel.GetChallengeStateById(t.Id);
    var r = s === 0;
    var s = s === 2;
    var h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t.Id);
    this.SetSelected(i);
    this.GetTexture(5).SetUIActive(t.IsLast);
    this.GetTexture(2).SetUIActive(t.IsLast);
    this.GetTexture(1).SetUIActive(!t.IsLast);
    this.GetItem(7).SetUIActive(r && t.IsLast);
    this.GetItem(8).SetUIActive(!t.IsLast);
    this.GetItem(9).SetUIActive(s);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), h.NpcName);
    this.TrySetTextureByPath(h.NpcIcon, this.GetTexture(3));
  }
  SetSelected(t) {
    var i = ModelManager_1.ModelManager.PhantomArenaModel.IsChallengeLock(this.ChallengeData?.Id ?? 0);
    var i = i ? 2 : !i && t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(i, false);
  }
  OnSelected(t) {
    this.SetSelected(true);
  }
  OnDeselected(t) {
    this.SetSelected(false);
  }
}
exports.NpcItem = NpcItem;
//# sourceMappingURL=PhantomArenaNpcItem.js.map