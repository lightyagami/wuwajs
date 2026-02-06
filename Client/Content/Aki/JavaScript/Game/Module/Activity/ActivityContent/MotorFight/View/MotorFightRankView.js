"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRankView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorFightRankItem_1 = require("./Item/MotorFightRankItem");
class MotorFightRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dcg = undefined;
    this.lqe = undefined;
    this.DAg = undefined;
    this.UAg = undefined;
    this.Bqe = () => {
      return new MotorFightRankItem_1.MotorFightRankItem();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.dcg = this.OpenParam;
    await Promise.all([ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestRankDataList(), ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestMyRankData()]);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.DAg = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.Bqe);
    var t = [];
    var i = this.dcg.GetRankList();
    t.push(this.DAg.RefreshByDataAsync(i));
    this.UAg = new MotorFightRankItem_1.MotorFightRankItem();
    t.push(this.UAg.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(t);
    var t = i.findIndex(t => t.IsMyRank === true);
    this.UAg.Refresh(this.dcg.MyRankData, false, t);
  }
}
exports.MotorFightRankView = MotorFightRankView;
//# sourceMappingURL=MotorFightRankView.js.map