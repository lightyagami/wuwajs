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
    this.Zum = undefined;
    this.ecm = undefined;
    this.tcm = undefined;
    this.icm = undefined;
    this.rcm = undefined;
    this.ocm = () => {
      this.rcm.SetResult(true);
      this.rcm = undefined;
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
    this.Zum = this.GetItem(2).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (this.Zum) {
      this.Zum.Stop();
    }
    this.ecm = this.GetItem(3).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (this.ecm) {
      this.ecm.Stop();
      this.tcm = (0, puerts_1.toManualReleaseDelegate)(this.ocm);
      this.icm = this.ecm.GetPlayTween().RegisterOnComplete(this.tcm);
    }
  }
  OnAfterShow() {
    var i = this.IsHang;
    super.OnAfterShow();
    if (this.Zum && !i) {
      this.Zum.Play();
    }
  }
  async OnHideAsyncImplementImplement() {
    if (this.ecm && !this.IsHang) {
      this.rcm = new CustomPromise_1.CustomPromise();
      this.ecm.Play();
      await this.rcm.Promise;
    }
  }
  OnBeforeDestroy() {
    if (this.tcm) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.ocm);
      this.tcm = undefined;
    }
    if (this.icm) {
      this.ecm.GetPlayTween().UnregisterOnComplete(this.icm);
      this.icm = undefined;
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