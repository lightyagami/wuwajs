"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsBetFailTip = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const DangoManager_1 = require("../../Dango/DangoLogic/DangoManager");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem");
class RacingBetsBetFailTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.G11 = 0;
    this.hM1 = undefined;
    this.sOt = () => {
      this.CloseMe();
    };
    this.GTc = () => {
      var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      if (e && e.GetLegMatchData(this.G11)) {
        RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(e.Id, this.G11);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UIArtText], [9, UE.UIText]];
    this.BtnBindInfo = [[5, this.sOt], [6, this.GTc]];
  }
  async OnBeforeStartAsync() {
    this.hM1 = new RacingBetsCostItem_1.RacingBetsCostItem();
    await this.hM1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnBeforeShow() {
    var e;
    var i;
    var t;
    var s;
    var a = this.OpenParam;
    if (a === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "RacingBetsFailTip OnBeforeShow matchResult is undefined");
      }
    } else {
      e = (i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()).GetLegMatchData(a.mJ_);
      this.G11 = a.mJ_;
      this.GetArtText(0).SetText(a.L8c.toString());
      s = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetConversionRate(a.L8c);
      i = i.GetCurrencyItemId();
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
      this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(3));
      this.GetText(2).SetText(a.T8c + " x " + s / 100);
      this.hM1.RefreshUi(i, a.DS_);
      t = DangoManager_1.DangoManager.GetDangoData(a.I8c);
      s = DangoManager_1.DangoManager.GetDangoData(a.b8c);
      this.SetTextureShowUntilLoaded(s.IconAttack, this.GetTexture(7));
      this.SetTextureShowUntilLoaded(t.IconDamageLarge, this.GetTexture(1));
      this.GetText(9).ShowTextNew(e?.Name ?? "");
    }
  }
}
exports.RacingBetsBetFailTip = RacingBetsBetFailTip;
//# sourceMappingURL=RacingBetsBetFailTip.js.map