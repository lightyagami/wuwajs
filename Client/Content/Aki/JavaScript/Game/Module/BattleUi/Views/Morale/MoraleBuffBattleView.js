"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffBattleView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  BattleUiHoverTipsC_1 = require("./BattleUiHoverTipsC");
class MoraleBuffBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.Xmt = void 0, this.kqe = e => {
      e ? (e = this.GetItem(1), this.Xmt.CreateAndShow(e, ModelManager_1.ModelManager.MoraleModel.GetInTheBattleBuffInfo())) : this.Xmt.EndShow()
    }, this.nz1 = () => {
      var e = this.GetExtendToggle(0);
      e && (1 === e.GetToggleState() ? e.SetToggleState(0, !0) : e.SetToggleState(1, !0))
    }
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(1, !1), this.Xmt = new BattleUiHoverTipsC_1.BattleUiHoverTipsC, this.Ore()
  }
  Reset() {
    super.Reset(), this.kre()
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.kqe]
    ]
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo, this.nz1)
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo, this.nz1)
  }
  StartShow() {
    this.Xmt.UpdateInfo(ModelManager_1.ModelManager.MoraleModel.GetInTheBattleBuffInfo()), this.SetVisible(1, !0), ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(8, !0)
  }
  EndShow() {
    this.Xmt.EndShow(), this.GetExtendToggle(0)?.SetToggleState(0, !0), this.SetVisible(1, !1), ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(8, !1)
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(8, !1)
  }
}
exports.MoraleBuffBattleView = MoraleBuffBattleView;
//# sourceMappingURL=MoraleBuffBattleView.js.map