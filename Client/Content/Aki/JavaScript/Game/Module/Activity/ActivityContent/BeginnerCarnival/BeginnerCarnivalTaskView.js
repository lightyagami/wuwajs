"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalTaskView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
const BeginnerCarnivalTaskItem_1 = require("./BeginnerCarnivalTaskItem");
const MAX_TYPE = 4;
const MIN_TYPE = 1;
class BeginnerCarnivalTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.q8e = 0;
    this.lqe = undefined;
    this.yhu = 0;
    this.xqe = undefined;
    this.Bqe = () => {
      return new BeginnerCarnivalTaskItem_1.BeginnerCarnivalTaskItem();
    };
    this.wwe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() < this.yhu)) {
        this.q8e--;
        if (this.q8e < MIN_TYPE) {
          this.q8e = MAX_TYPE;
        }
        this._7e(this.q8e);
        this.yhu = TimeUtil_1.TimeUtil.GetServerTimeStamp() + 100;
        this.UiViewSequence?.StopSequenceByKey("Switch");
        this.UiViewSequence?.PlaySequence("Switch");
      }
    };
    this.Pwe = () => {
      if (!(TimeUtil_1.TimeUtil.GetServerTimeStamp() < this.yhu)) {
        this.q8e++;
        if (this.q8e > MAX_TYPE) {
          this.q8e = MIN_TYPE;
        }
        this._7e(this.q8e);
        this.yhu = TimeUtil_1.TimeUtil.GetServerTimeStamp() + 100;
        this.UiViewSequence?.StopSequenceByKey("Switch");
        this.UiViewSequence?.PlaySequence("Switch");
      }
    };
    this.I$1 = () => {
      this._7e(this.q8e);
    };
    this.g3e = e => {
      var i;
      if (e.has(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId)) {
        e = () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView);
        };
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e);
        i.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.wwe], [4, this.Pwe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.I$1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.I$1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.Bqe);
  }
  OnStart() {
    this.q8e = this.OpenParam;
  }
  OnBeforeShow() {
    this._7e(this.q8e);
  }
  _7e(e) {
    const n = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var i = n.GetTaskIdListByTypeId(e);
    i.sort((e, i) => {
      var t = n.GetTaskDataById(e).H6n;
      var r = n.GetTaskDataById(i).H6n;
      if (t === r) {
        return e - i;
      } else {
        return (t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : t === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1) - (r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1);
      }
    });
    this.xqe.RefreshByData(i);
    this.xqe.PlayTurnAnimation();
    var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().GetProgress(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BeginnerCarnivalCurrentProgress", i[0], i[1]);
    var i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalTaskType(e);
    this.lqe?.SetTitleByTextIdAndArgNew(i?.Title ?? "");
    this.GetItem(6).SetUIActive(this.q8e === 1);
    this.GetItem(7).SetUIActive(this.q8e === 2);
    this.GetItem(8).SetUIActive(this.q8e === 3);
    this.GetItem(9).SetUIActive(this.q8e === 4);
  }
}
exports.BeginnerCarnivalTaskView = BeginnerCarnivalTaskView;
//# sourceMappingURL=BeginnerCarnivalTaskView.js.map