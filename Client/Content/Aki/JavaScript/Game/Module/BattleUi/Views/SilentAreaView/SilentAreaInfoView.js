"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const SilentAreaInfoPanel_1 = require("./SilentAreaInfoPanel");
class SilentAreaView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Xmt = undefined;
    this.$mt = BigInt(0);
    this.Gar = undefined;
    this.kqe = e => {
      var t;
      if (e) {
        e = this.GetItem(1);
        t = this.Gar?.GetSilentAreaShowInfo();
        this.Xmt.CreateAndShow("UiItem_HoverTipsC", e, t);
      } else {
        this.Xmt.EndShow();
      }
    };
    this.Jmt = () => {
      var e = this.GetExtendToggle(0);
      if (e) {
        if (e.GetToggleState() === 1) {
          e.SetToggleState(0, true);
        } else {
          e.SetToggleState(1, true);
        }
      }
    };
  }
  get Id() {
    return this.$mt;
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(1, false);
    this.Xmt = new SilentAreaInfoPanel_1.SilentAreaInfoPanel();
    this.Ore();
  }
  Reset() {
    super.Reset();
    this.kre();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView, this.Jmt);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView, this.Jmt);
  }
  StartShow(e, t) {
    this.$mt = e;
    this.Gar = t;
    this.Xmt.UpdateInfo(t.GetSilentAreaShowInfo());
    this.SetVisible(1, true);
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(1, true);
  }
  EndShow() {
    this.Xmt.EndShow();
    this.GetExtendToggle(0)?.SetToggleState(0, true);
    this.SetVisible(1, false);
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(1, false);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(1, false);
  }
}
exports.SilentAreaView = SilentAreaView;
//# sourceMappingURL=SilentAreaInfoView.js.map