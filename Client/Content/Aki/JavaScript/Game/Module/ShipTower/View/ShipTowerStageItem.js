"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerStageItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerStageItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
  }
  async Init(i, e) {
    this.ItemData = e;
    await this.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UISprite], [7, UE.UITexture]];
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "UpdateData", ["", this.ItemData]);
    }
    var i = this.ItemData.IsUnLocked();
    var e = this.ItemData.IsPassed();
    var t = this.ItemData.IsCurrent();
    this.GetItem(1).SetUIActive(i);
    this.GetItem(0).SetUIActive(!i);
    this.GetItem(2).SetUIActive(e);
    this.GetText(3).SetText(this.ItemData.OrderIndex.toString());
    this.GetText(5).ShowTextNew(this.ItemData.TitleKey);
    this.GetSprite(6).SetUIActive(t);
    var i = this.ItemData.GetStageGradeResIdByScore(this.ItemData.CurrentScore);
    var e = i !== undefined;
    var t = this.GetTexture(7);
    t?.SetUIActive(e);
    if (e) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      this.SetTextureByPath(e, t);
    }
    var i = this.ItemData.CurrentScore > 0;
    var e = this.GetText(4);
    e.SetUIActive(i);
    if (i) {
      t = ShipTowerDefine_1.shipTowerTextKey.ScorePoint;
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t, this.ItemData.CurrentScore.toString());
    }
  }
}
exports.ShipTowerStageItem = ShipTowerStageItem;
//# sourceMappingURL=ShipTowerStageItem.js.map