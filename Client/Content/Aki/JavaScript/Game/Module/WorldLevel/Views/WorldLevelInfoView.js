"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelInfoView = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const ShopUtils_1 = require("../../Shop/ShopUtils");
class WorldLevelInfoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Zko = false;
    this.e2o = undefined;
    this.t2o = undefined;
    this.i2o = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("OnlineCantChangeLevel");
      } else {
        UiManager_1.UiManager.CloseView("WorldLevelInfoView");
        if (!UiManager_1.UiManager.IsViewShow("WorldLevelChangeConfirmView")) {
          UiManager_1.UiManager.OpenView("WorldLevelChangeConfirmView");
        }
      }
    };
  }
  get CanShowInteractCd() {
    return this.Zko;
  }
  set CanShowInteractCd(e) {
    if (this.Zko !== e) {
      this.Zko = e;
      this.GetItem(8).SetUIActive(!this.Zko && ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel >= this.e2o);
      this.GetItem(4).SetUIActive(this.Zko);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem]];
    this.BtnBindInfo = [[5, this.i2o]];
  }
  OnStart() {
    this.t2o = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue("world_level_change_cd");
    this.e2o = ConfigManager_1.ConfigManager.WorldLevelConfig.GetCommonValue("world_level_change_conditon_level");
    this.GetItem(3).SetUIActive(true);
    this.GetItem(8).SetUIActive(true);
    this.Ubt();
    this.zko();
    this.o2o();
  }
  OnTick(e) {
    this.r2o();
  }
  Ubt() {
    this.GetText(0).SetText(ModelManager_1.ModelManager.WorldLevelModel.WorldLevelMultilingualText);
  }
  zko() {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelIntro");
    this.GetText(2).SetText(e);
  }
  o2o() {
    var e = this.n2o();
    var e = Math.max(this.t2o - e, 0) > 0;
    if (ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel < this.e2o || e) {
      this.GetItem(8).SetUIActive(false);
    } else {
      this.r2o();
    }
  }
  r2o() {
    var i = this.n2o();
    var i = Math.max(this.t2o - i, 0);
    this.CanShowInteractCd = i > 0;
    if (this.CanShowInteractCd) {
      this.GetText(6).SetText(ShopUtils_1.ShopUtils.FormatTime(i));
    } else {
      var i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      var t = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
      let e = "";
      if (i === t) {
        ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget = i - 1;
        e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelDown");
      } else if (i < t) {
        ModelManager_1.ModelManager.WorldLevelModel.WorldLevelChangeTarget = i + 1;
        e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevelRestore");
      }
      this.GetText(7).SetText(e);
    }
  }
  n2o() {
    return TimeUtil_1.TimeUtil.GetServerTime() - ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp;
  }
}
exports.WorldLevelInfoView = WorldLevelInfoView;
//# sourceMappingURL=WorldLevelInfoView.js.map