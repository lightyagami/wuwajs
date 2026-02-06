"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySettleFailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStorySettleItem_1 = require("./HonamiStorySettleItem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
class HonamiStorySettleFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.sGe = () => new HonamiStorySettleItem_1.HonamiStorySettleItem();
    this.Htu = () => {
      HonamiStoryController_1.HonamiStoryController.LeaveHonamiDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Htu]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.sGe);
  }
  OnBeforeShow() {
    var e;
    var i = this.OpenParam;
    if (i) {
      this.GetItem(6).SetUIActive(false);
      this.xqe?.RefreshByData(i.DisplayItems, () => {
        if (this.xqe?.IsExpand) {
          this.GetItem(6).SetUIActive(true);
        }
      }, true);
      this.GetText(1).SetText(i.TotalReward.toString());
      this.GetItem(2).SetUIActive(i.IsNewRecord);
      e = (i = i.FailAddProportion) > 0;
      this.GetItem(4).SetUIActive(e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "HonamiStory_EvacuationInterface_4", i);
      }
      this.Qjm();
    }
  }
  Qjm() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(3);
    AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent);
  }
}
exports.HonamiStorySettleFailView = HonamiStorySettleFailView;
//# sourceMappingURL=HonamiStorySettleFailView.js.map