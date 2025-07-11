"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoShareBtnItem = undefined;
const UE = require("ue");
const SharePlatformById_1 = require("../../../../Core/Define/ConfigQuery/SharePlatformById");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhotoShareBtnItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pKi = 0;
    this.vKi = undefined;
    this.L6e = 0;
    this.NTt = undefined;
    this.aTn = 1;
    this.FWt = () => {
      var t;
      var i = TimeUtil_1.TimeUtil.GetServerTime();
      if (i - this.L6e < this.aTn) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotShare");
      } else {
        this.L6e = i;
        i = this.pKi;
        t = SharePlatformById_1.configSharePlatformById.GetConfig(i).ShareId;
        this.NTt?.(t, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.FWt]];
  }
  OnStart() {
    this.aTn = ConfigManager_1.ConfigManager.CommonConfig.GetShareGap() ? ConfigManager_1.ConfigManager.CommonConfig.GetShareGap() : 1;
    this.vKi = this.GetSprite(0).GetOwner().GetComponentByClass(UE.UISpriteTransition.StaticClass());
  }
  SetClickCallBack(t) {
    this.NTt = t;
  }
  Refresh(t, i, r) {
    this.Update(t);
    this.RefreshPanel();
  }
  Update(t) {
    this.pKi = t;
  }
  RefreshPanel() {
    var t = SharePlatformById_1.configSharePlatformById.GetConfig(this.pKi);
    if (t) {
      this.SetSpriteByPath(t.Icon, this.GetSprite(0), false, undefined, t => {
        this.vKi?.SetAllTransitionSprite(this.GetSprite(0).GetSprite());
      });
    }
  }
  OnBeforeDestroy() {
    this.vKi = undefined;
  }
}
exports.PhotoShareBtnItem = PhotoShareBtnItem;
//# sourceMappingURL=PhotoShareBtnItem.js.map