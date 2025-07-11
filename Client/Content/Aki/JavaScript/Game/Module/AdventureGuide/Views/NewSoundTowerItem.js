"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundTowerItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundTowerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem]];
  }
  Update(e) {
    this.LV_(e);
    if (e.DetectRecordData.Conf?.Secondary === 28) {
      this.wV_(e);
    } else {
      this.RV_(e);
    }
  }
  LV_(e) {
    var e = e.DetectRecordData;
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Conf.Name);
    var t = this.GetTexture(1);
    var a = e.IsLock ? e.Conf.LockBigIcon : e.Conf.BigIcon;
    this.SetTextureShowUntilLoaded(a, t);
    var a = this.GetText(2);
    var t = this.GetText(3);
    a.SetUIActive(!e.IsLock);
    t.SetUIActive(!e.IsLock);
  }
  RV_(e) {
    var t;
    if (!e.DetectRecordData.IsLock) {
      e = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
      t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(e);
      this.AV_(t);
      t = ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(e);
      e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAllStars(e);
      this.PV_(t + "/" + e);
      this.GetItem(5)?.SetUIActive(true);
    }
  }
  wV_(e) {
    if (!e.DetectRecordData.IsLock) {
      this.AV_(ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName());
      this.PV_(ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText(false));
      this.GetItem(5)?.SetUIActive(false);
    }
  }
  AV_(e) {
    this.GetText(2).SetText(e);
  }
  PV_(e) {
    this.GetText(3).SetText(e);
  }
}
exports.NewSoundTowerItem = NewSoundTowerItem;
//# sourceMappingURL=NewSoundTowerItem.js.map