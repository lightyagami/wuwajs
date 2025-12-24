"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySettleSuccessView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStorySettleItem_1 = require("./HonamiStorySettleItem");
class HonamiStorySettleSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.sGe = () => new HonamiStorySettleItem_1.HonamiStorySettleItem();
    this.Htu = () => {
      HonamiStoryController_1.HonamiStoryController.LeaveHonamiDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Htu]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    if (e) {
      this.xqe?.RefreshByData(e.DisplayItems, undefined, true);
      this.GetText(1).SetText(e.TotalReward.toString());
      this.GetItem(2).SetUIActive(e.IsNewRecord);
      this.c9m();
    }
  }
  c9m() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(2);
    AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent);
  }
}
exports.HonamiStorySettleSuccessView = HonamiStorySettleSuccessView;
//# sourceMappingURL=HonamiStorySettleSuccessView.js.map