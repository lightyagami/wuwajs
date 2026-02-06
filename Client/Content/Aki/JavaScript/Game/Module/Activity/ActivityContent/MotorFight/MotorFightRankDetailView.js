"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRankDetailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const MotorFightItemSmallGrid_1 = require("./View/Item/MotorFightItemSmallGrid");
class MotorFightRankDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.kcg = undefined;
    this.Bqe = () => {
      return new MotorFightItemSmallGrid_1.MotorFightItemSmallGrid();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [6, UE.UIText], [5, UE.UIText], [7, UE.UIText], [8, UE.UILoopScrollViewComponent], [9, UE.UIItem], [10, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    var i = this.OpenParam;
    var t = [];
    t.push(this.SetTextureAsync(i.TexturePath, this.GetTexture(2)));
    this.GetText(3)?.SetText(i.Name);
    this.GetText(4)?.SetText(i.Score.toString());
    this.GetText(5)?.SetText(i.WaveNum.toString());
    this.GetText(6)?.SetText(i.KillNum.toString());
    this.GetText(7)?.SetText(i.BuffGateNum.toString());
    this.kcg = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(8), this.GetItem(9).GetOwner(), this.Bqe);
    t.push(this.kcg.RefreshByDataAsync(i.ItemList));
    await Promise.all(t);
    this.GetItem(10)?.SetUIActive(i.ItemList.length === 0);
  }
}
exports.MotorFightRankDetailView = MotorFightRankDetailView;
//# sourceMappingURL=MotorFightRankDetailView.js.map