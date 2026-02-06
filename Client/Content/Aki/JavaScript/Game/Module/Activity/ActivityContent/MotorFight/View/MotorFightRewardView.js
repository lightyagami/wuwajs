"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const MotorFightTaskItem_1 = require("./Item/MotorFightTaskItem");
const MotorFightTaskTabItem_1 = require("./Item/MotorFightTaskTabItem");
class MotorFightRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.hT = 0;
    this.B7t = undefined;
    this.qoh = undefined;
    this.wNe = e => {
      if (e === this.CNe.Id) {
        this.B7t.RefreshByData(this.CNe.GetMotorFightTaskTabList(), () => {
          this.HEu(this.hT);
        });
      }
    };
    this.Hwn = () => {
      var e = new MotorFightTaskTabItem_1.MotorFightTaskTabItem();
      e.ActivityData = this.CNe;
      e.OnToggleClickCallBack = this.HEu;
      return e;
    };
    this.HEu = e => {
      this.hT = e;
      this.B7t.SelectGridProxy(this.B7t.GetScrollItemByKey(e).GridIndex);
      this.Ooh(true);
    };
    this.VOe = () => {
      var e = new MotorFightTaskItem_1.MotorFightTaskItem();
      e.OnRewardBtnClick = this.g6e;
      return e;
    };
    this.g6e = () => {
      this.CNe.RequestTaskReward(this.hT);
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.CNe = this.OpenParam;
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.AMo);
    this.B7t = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Hwn);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.VOe);
    var e = this.CNe.GetMotorFightTaskTabList();
    await this.B7t.RefreshByDataAsync(e, true);
    this.HEu(e[0].Id);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnTick(e) {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var t = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, t);
    this.GetText(5)?.SetText(t);
  }
  Ooh(e = false) {
    this.qoh.RefreshByData(this.CNe.GetTaskDataList(this.hT), () => {
      this.GetScrollViewWithScrollbar(3)?.SetScrollProgress(0);
    }, e);
  }
}
exports.MotorFightRewardView = MotorFightRewardView;
//# sourceMappingURL=MotorFightRewardView.js.map