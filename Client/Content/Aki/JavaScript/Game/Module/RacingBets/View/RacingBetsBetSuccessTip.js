"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsBetSuccessTip = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem");
class RacingBetsBetSuccessTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.g11 = 0, this.qS1 = void 0, this.sOt = () => {
      this.CloseMe()
    }, this.GTc = () => {
      var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      e && e.GetLegMatchData(this.g11) && (RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(e.Id, this.g11), this.CloseMe())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIText]
    ], this.BtnBindInfo = [
      [5, this.sOt],
      [6, this.GTc]
    ]
  }
  async OnBeforeStartAsync() {
    this.qS1 = new RacingBetsCostItem_1.RacingBetsCostItem, await this.qS1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())
  }
  OnBeforeShow() {
    var e, i, s, t, a = this.OpenParam;
    void 0 === a ? Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsSuccessTip OnBeforeShow matchResult is undefined") : (e = (s = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()).GetLegMatchData(a.mJ_), this.g11 = a.mJ_, this.GetArtText(0).SetText(a.L8c.toString()), i = DangoManager_1.DangoManager.GetDangoData(a.I8c), s = s.GetCurrencyItemId(), t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s), this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(3)), this.GetText(2).SetText(a.T8c + " x " + a.YZ_ / 100), this.qS1.RefreshUi(s, a.DS_), this.SetTextureShowUntilLoaded(i.IconAttackLarge, this.GetTexture(1)), this.GetText(7).ShowTextNew(e.Name))
  }
}
exports.RacingBetsBetSuccessTip = RacingBetsBetSuccessTip;
//# sourceMappingURL=RacingBetsBetSuccessTip.js.map