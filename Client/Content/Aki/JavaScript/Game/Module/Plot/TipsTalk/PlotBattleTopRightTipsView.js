"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotBattleTopRightTipsView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotTipsViewBase_1 = require("./PlotTipsViewBase");
class PlotBattleTopRightTipsView extends PlotTipsViewBase_1.PlotTipsViewBase {
  constructor() {
    super();
    this.uhm = undefined;
    this.chm = undefined;
    this.dhm = undefined;
    this.mhm = undefined;
    this.fhm = undefined;
    this.ghm = () => {
      this.fhm.SetResult(true);
      this.fhm = undefined;
    };
    this.ResourceId = "UiItem_MainTalk";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnInit() {
    this.IconItem = this.GetTexture(0);
    this.SubtitleItem = this.GetText(1);
    this.IconItem.GetParentAsUIItem().SetUIItemAlpha(0);
    this.SubtitleItem.GetParentAsUIItem().SetUIItemAlpha(0);
    this.uhm = this.GetItem(2).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (this.uhm) {
      this.uhm.Stop();
    }
    this.chm = this.GetItem(3).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (this.chm) {
      this.chm.Stop();
      this.dhm = (0, puerts_1.toManualReleaseDelegate)(this.ghm);
      this.mhm = this.chm.GetPlayTween().RegisterOnComplete(this.dhm);
    }
  }
  OnAfterShow() {
    var i = this.IsHang;
    super.OnAfterShow();
    if (this.uhm && !i) {
      this.uhm.Play();
    }
  }
  async OnHideAsyncImplementImplement() {
    if (this.chm && !this.IsHang) {
      this.fhm = new CustomPromise_1.CustomPromise();
      this.chm.Play();
      await this.fhm.Promise;
    }
  }
  OnBeforeDestroy() {
    if (this.dhm) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.ghm);
      this.dhm = undefined;
    }
    if (this.mhm) {
      this.chm.GetPlayTween().UnregisterOnComplete(this.mhm);
      this.mhm = undefined;
    }
  }
  GetParentItem() {
    var i = this.GetViewName();
    if (i) {
      i = UiManager_1.UiManager.GetViewByName(i);
      if (i) {
        return i.GetRootItem();
      }
    }
    return super.GetParentItem();
  }
}
exports.PlotBattleTopRightTipsView = PlotBattleTopRightTipsView;
//# sourceMappingURL=PlotBattleTopRightTipsView.js.map