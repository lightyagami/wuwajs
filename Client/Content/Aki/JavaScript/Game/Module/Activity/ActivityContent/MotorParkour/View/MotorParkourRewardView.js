"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const MotorParkourTaskItem_1 = require("./Item/MotorParkourTaskItem");
const MotorParkourTaskTabItem_1 = require("./Item/MotorParkourTaskTabItem");
class MotorParkourRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.mFi = [];
    this.FMf = undefined;
    this.Ny1 = undefined;
    this.VMf = undefined;
    this.wNe = () => {
      this.Ny1.RefreshAllGridProxies();
      this.Ooh();
    };
    this.HEu = e => {
      this.FMf = e;
      e = this.mFi.findIndex(e => e.Id === this.FMf.Id);
      this.Ny1.SelectGridProxy(e);
      this.Ooh();
    };
    this.Hwn = () => {
      var e = new MotorParkourTaskTabItem_1.MotorParkourTaskTabItem();
      e.OnToggleCallback = this.HEu;
      return e;
    };
    this.kou = () => {
      return new MotorParkourTaskItem_1.MotorParkourTaskItem();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [6, UE.UIItem], [7, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.CNe = e.ActivityData;
    new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)).SetCloseCallBack(this.AMo);
    this.Ny1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(3).GetOwner(), this.Hwn);
    this.VMf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(6).GetOwner(), this.kou);
    var t = [];
    this.mFi = this.CNe.GetLevelDataList();
    t.push(this.Ny1.RefreshByDataAsync(this.mFi));
    await Promise.all(t);
    this.FMf = e.SelectLevelData;
    this.HEu(this.FMf);
  }
  OnTick(e) {
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var t = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, t);
    this.GetText(7)?.SetText(t);
  }
  Ooh() {
    var e = this.FMf.TaskList;
    this.VMf.RefreshByData(e, false, () => {
      this.VMf.ScrollToGridIndex(0);
    }, true);
  }
}
exports.MotorParkourRewardView = MotorParkourRewardView;
//# sourceMappingURL=MotorParkourRewardView.js.map