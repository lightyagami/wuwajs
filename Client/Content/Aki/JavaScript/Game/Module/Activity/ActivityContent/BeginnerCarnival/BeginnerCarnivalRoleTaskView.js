"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalSpineItem = exports.BeginnerCarnivalRoleTaskView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
const BeginnerCarnivalTaskItem_1 = require("./BeginnerCarnivalTaskItem");
const ROLE_TYPE_ID = 5;
const ABU_ID = 1000;
class BeginnerCarnivalRoleTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.xqe = undefined;
    this.$hu = new Map();
    this.j2e = undefined;
    this.Bqe = () => {
      return new BeginnerCarnivalTaskItem_1.BeginnerCarnivalTaskItem();
    };
    this.Rsu = () => {
      this.Og();
    };
    this.I$1 = () => {
      this.Og();
    };
    this.M$1 = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", undefined, (e, i) => {
        this.AddChildViewById(i);
      });
    };
    this.Fy1 = () => {
      const e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
      var i;
      var n;
      if (e.ChoseRoleId > 0) {
        i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(329);
        n = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ChoseRoleId).Name);
        i.SetTextArgs(n ?? "");
        i.FunctionMap.set(2, () => {
          BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalAwardRequest(e.GetRoleTaskId);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(328)).FunctionMap.set(2, () => {
          UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", undefined, (e, i) => {
            this.AddChildViewById(i);
          });
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
      }
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem]];
    this.BtnBindInfo = [[2, this.M$1], [5, this.Fy1]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Rsu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.I$1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Rsu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.I$1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Bqe);
    var e = this.GetItem(8);
    this.j2e = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
    await this.j2e.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    var e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var i = e.ChoseRoleId;
    if (!e.GetHaveChoseRoleViewEnter() && i <= 0) {
      this.M$1();
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    const t = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var e = t.GetTaskIdListByTypeId(ROLE_TYPE_ID);
    e.sort((e, i) => {
      var n = t.GetTaskDataById(e).H6n;
      var r = t.GetTaskDataById(i).H6n;
      if (n === r) {
        return e - i;
      } else {
        return (n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1) - (r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1);
      }
    });
    this.xqe.RefreshByData(e);
    var e = t.ChoseRoleId;
    var i = e > 0;
    this.j2e.SetUiActive(i);
    if (i) {
      this.j2e.Update(e);
    }
    var i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(i ? e : ABU_ID);
    for (const [, n] of this.$hu) {
      n.SetUiActive(false);
    }
    let n = this.$hu.get(e);
    if (n) {
      n.SetUiActive(true);
      n.SetAnimation(0, "idle", true);
    } else {
      (n = new BeginnerCarnivalSpineItem()).CreateThenShowByResourceIdAsync(i.RoleViewSpineItem, this.GetItem(1)).then(() => {
        n.SetAnimation(0, "idle", true);
      });
      this.$hu.set(e, n);
    }
    var r;
    var o;
    var i = t.ChoseRoleId !== 0 ? ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.ChoseRoleId).Name) : "";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BeginnerCarnivalGetRoleDes", i);
    var e = t.GetTaskDataById(t.GetRoleTaskId);
    if (e) {
      i = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
      r = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
      o = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
      this.GetItem(10).SetUIActive(i);
      this.GetItem(11).SetUIActive(o);
      this.GetButton(5).RootUIComp.SetUIActive(r);
      this.GetItem(13).SetUIActive(r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "BeginnerCarnivalCurrentProgress", e.lMs, e.j6n);
      this.GetSprite(4).SetFillAmount(e.lMs / e.j6n);
      this.GetButton(2).RootUIComp.SetUIActive(!i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "BeginnerCarnivalAllCount", t.GetCurrentItemCount());
    }
  }
}
exports.BeginnerCarnivalRoleTaskView = BeginnerCarnivalRoleTaskView;
class BeginnerCarnivalSpineItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent]];
  }
  SetAnimation(e, i, n) {
    this.GetSpine(0).SetAnimation(e, i, n);
  }
}
exports.BeginnerCarnivalSpineItem = BeginnerCarnivalSpineItem;
//# sourceMappingURL=BeginnerCarnivalRoleTaskView.js.map