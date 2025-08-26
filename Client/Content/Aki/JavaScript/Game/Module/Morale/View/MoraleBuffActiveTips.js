"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffActiveTips = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class MoraleBuffActiveTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TipCountDown = 0;
    this.ShowBuffList = [];
    this.CurShowInfo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.ShowBuffList = ModelManager_1.ModelManager.MoraleModel.BuffActiveTipsList;
    this.GetItem(3)?.SetUIActive(true);
    this.GetItem(5)?.SetUIActive(true);
    this.GetItem(4)?.SetUIActive(false);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var t;
    this.CurShowInfo = this.ShowBuffList.shift();
    if (this.CurShowInfo) {
      this.TipCountDown = ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleBuffShowTime();
      if (t = ModelManager_1.ModelManager.MoraleModel.BuffMap.get(this.CurShowInfo.BuffId)) {
        this.GetText(1).ShowTextNew(t.Config.BuffName);
        this.GetText(2).ShowTextNew(t.Config.BuffDescDetail);
        this.UpdateState();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "buffData is not find", ["buffId", this.CurShowInfo.BuffId]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "buffData show is finish");
      }
      this.CloseMe();
    }
  }
  UpdateState() {
    switch (this.CurShowInfo.State) {
      case 1:
        this.SetStateActive();
        break;
      case 0:
        this.SetStateTempActive();
        break;
      case 2:
        this.SetStateNotActive();
    }
  }
  SetStateActive() {
    this.rWi(false);
    this._iu("Morale_title_24");
    this.uiu("SP_ItemNewBg");
    this.ciu(9);
    this.diu(false);
    this.miu(false);
  }
  SetStateTempActive() {
    this.rWi(true);
    this._iu("Morale_title_25");
    this.uiu("SP_ItemNewBg");
    this.ciu(9);
    this.diu(false);
    this.miu(false);
  }
  SetStateNotActive() {
    this.rWi(false);
    this._iu("Morale_title_26");
    this.uiu("SP_InvalidationBg");
    this.ciu(10);
    this.diu(true);
    this.miu(true);
  }
  rWi(t) {
    this.GetItem(7).SetUIActive(t);
  }
  _iu(t) {
    this.GetText(8)?.ShowTextNew(t);
  }
  uiu(t) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    var i = this.GetSprite(6);
    this.SetSpriteByPath(t, i, false);
  }
  ciu(t) {
    for (const i of [9, 10]) {
      this.GetItem(i).SetUIActive(i === t);
    }
  }
  diu(t) {
    this.GetItem(11).SetUIActive(t);
  }
  miu(t) {
    var i = this.GetText(1);
    i?.SetChangeColor(t, i.changeColor);
  }
  OnTick(t) {
    if (!(this.TipCountDown <= 0)) {
      this.TipCountDown -= t;
      if (this.TipCountDown <= 0) {
        this.fiu();
      }
    }
  }
  fiu() {
    if (this.ShowBuffList.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "刷新下个Buff数据");
      }
      this.s9_();
    } else {
      this.CloseMe();
    }
  }
  async s9_() {
    await this.PlaySequenceAsync("Close");
    this.PlaySequence("Start");
    this.UpdateData();
  }
}
exports.MoraleBuffActiveTips = MoraleBuffActiveTips;
//# sourceMappingURL=MoraleBuffActiveTips.js.map