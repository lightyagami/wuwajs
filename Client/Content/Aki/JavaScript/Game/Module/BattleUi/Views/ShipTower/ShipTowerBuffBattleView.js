"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffBattleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleUiHoverTipsD_1 = require("./BattleUiHoverTipsD");
class ShipTowerBuffBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Xmt = undefined;
    this.kqe = e => {
      if (e) {
        e = this.GetItem(1);
        this.Xmt.CreateAndShow(e, ModelManager_1.ModelManager.ShipTowerModel.GetInTheBattleBuffInfo());
      } else {
        this.Xmt.EndShow();
      }
    };
    this.RG_ = () => {
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
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(1, false);
    this.Xmt = new BattleUiHoverTipsD_1.BattleUiHoverTipsD();
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo, this.RG_);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiToggleShipTowerBuffInfo, this.RG_);
  }
  StartShow() {
    this.Xmt.UpdateInfo(ModelManager_1.ModelManager.ShipTowerModel.GetInTheBattleBuffInfo());
    this.SetVisible(1, true);
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(6, true);
  }
  EndShow() {
    this.Xmt.EndShow();
    this.GetExtendToggle(0)?.SetToggleState(0, true);
    this.SetVisible(1, false);
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(6, false);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(6, false);
  }
}
exports.ShipTowerBuffBattleView = ShipTowerBuffBattleView;
//# sourceMappingURL=ShipTowerBuffBattleView.js.map