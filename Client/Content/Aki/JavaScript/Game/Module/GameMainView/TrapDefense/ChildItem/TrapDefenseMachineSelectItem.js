"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMachineSelectItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TrapDefenseMachineSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Toggle = undefined;
    this.ToggleClick = undefined;
    this.Data = undefined;
    this.Index = 0;
    this.CdText = undefined;
    this.CdSprite = undefined;
    this.CdTime = 0;
    this.CdActiveState = false;
    this.gke = () => {
      return this.Toggle.GetToggleState() !== 1;
    };
    this.Yju = i => {
      if (i === 1) {
        this.ToggleClick(this);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Yju]];
  }
  OnStart() {
    this.CdText = this.GetText(6);
    this.CdSprite = this.GetSprite(7);
    this.CdActiveState = false;
    this.Toggle = this.GetExtendToggle(0);
    this.Toggle.CanExecuteChange.Bind(this.gke);
  }
  Ynd(i) {
    if (this.CdActiveState !== i) {
      this.CdActiveState = i;
      this.GetItem(5).SetUIActive(i);
    }
  }
  znd() {
    var i = (this.CdTime / TimeUtil_1.TimeUtil.InverseMillisecond).toFixed(1);
    this.CdText?.SetText(i);
  }
  Jnd() {
    this.CdSprite?.SetFillAmount(this.CdTime / this.Data.GetCoolDown());
  }
  Refresh(i) {
    this.Data = i;
    this.RefreshSelf();
  }
  RefreshSelf() {
    var i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsCanBuildMachine;
    var t = this.GetItem(3);
    var s = this.GetTexture(1);
    var e = this.GetExtendToggle(0);
    t.SetUIActive(!this.Data);
    s.SetUIActive(!!this.Data);
    e.SetSelfInteractive(!!this.Data || i);
    this.RefreshCd();
    this.RefreshCoin();
    if (this.Data) {
      t = this.Data.GetIconPath();
      this.SetTextureAsync(t, s);
    }
  }
  RefreshCoin() {
    var i;
    var t;
    var s = this.GetItem(8);
    if (this.Data && this.Data.IsBuilding) {
      i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum();
      s.SetUIActive(true);
      (t = this.GetText(2)).SetText(this.Data.GetBuildingCost(true).toString());
      t.SetChangeColor(i < this.Data.GetBuildingCost(true), t.changeColor);
    } else {
      s.SetUIActive(false);
    }
  }
  RefreshCd() {
    if (this.Data && this.Data.GetRemainCd() > 0) {
      this.CdTime = this.Data.GetRemainCd() * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Ynd(this.CdTime > 0);
      this.znd();
      this.Jnd();
    } else {
      this.CdTime = 0;
      this.Ynd(false);
    }
  }
  SetToggleState(i, t = false) {
    this.GetExtendToggle(0).SetToggleStateForce(i, t);
  }
  Tick(i) {
    if (!!this.Data && !this.Data.IsBuilding && !(this.CdTime <= 0)) {
      this.CdTime -= i * Time_1.Time.TimeDilation;
      this.Ynd(this.CdTime > 0);
      this.znd();
      this.Jnd();
    }
  }
}
exports.TrapDefenseMachineSelectItem = TrapDefenseMachineSelectItem;
//# sourceMappingURL=TrapDefenseMachineSelectItem.js.map