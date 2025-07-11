"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerShowBuffView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
class ShipTowerShowBuffView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.sft = undefined;
    this.GMt = 0;
    this.NG_ = [];
    this.CurBuffId = undefined;
    this.kOl = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenActivityViewShipTower);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.kOl]];
  }
  Es_() {
    this.NG_ = ModelManager_1.ModelManager.ShipTowerModel.ShowBuffIdList;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    var e = this.GetItem(0).GetOwner();
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    await this.sft.CreateThenShowByActorAsync(e);
    this.sft.SetToggleInteractive(false);
  }
  OnBeforeShow() {
    this.Slo();
  }
  Slo() {
    var e = this.NG_.shift();
    var i = ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e ?? 0);
    this.CurBuffId = e;
    if (i) {
      this.GMt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd;
      this.GetText(1)?.ShowTextNew(i.ItemNameKey);
      this.GetText(2)?.ShowTextNew(i.ObtainedShowDescKey);
      this.sft?.Apply({
        ItemConfigId: i.ItemId,
        Type: 4,
        Data: undefined
      });
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 69, "buffData show is finish", ["buffId", e]);
      }
      this.CloseMe();
    }
  }
  OnTick(e) {
    if (!(this.GMt <= 0)) {
      this.GMt -= e;
      if (this.GMt <= 0) {
        this.CloseViewOrShowNextData();
      }
    }
  }
  CloseViewOrShowNextData() {
    if (this.NG_.length > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "刷新下个Buff数据");
      }
      this.s9_();
    } else {
      this.CloseMe();
    }
  }
  async s9_() {
    await this.PlaySequenceAsync("Close");
    this.PlaySequence("Start");
    this.Slo();
  }
}
exports.ShipTowerShowBuffView = ShipTowerShowBuffView;
//# sourceMappingURL=ShipTowerShowBuffView.js.map