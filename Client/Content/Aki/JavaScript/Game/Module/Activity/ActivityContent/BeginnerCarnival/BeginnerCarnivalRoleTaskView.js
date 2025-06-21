"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalSpineItem = exports.BeginnerCarnivalRoleTaskView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent"),
  BeginnerCarnivalController_1 = require("./BeginnerCarnivalController"),
  BeginnerCarnivalTaskItem_1 = require("./BeginnerCarnivalTaskItem"),
  ROLE_TYPE_ID = 5,
  ABU_ID = 1e3;
class BeginnerCarnivalRoleTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.xqe = void 0, this.Aou = new Map, this.j2e = void 0, this.Bqe = () => {
      return new BeginnerCarnivalTaskItem_1.BeginnerCarnivalTaskItem
    }, this.Giu = () => {
      this.Og()
    }, this.NH1 = () => {
      this.Og()
    }, this.GH1 = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", void 0, (e, i) => {
        this.AddChildViewById(i)
      })
    }, this.gy1 = () => {
      const e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
      var i, n;
      0 < e.ChoseRoleId ? (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(329), n = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ChoseRoleId).Name), i.SetTextArgs(n ?? ""), i.FunctionMap.set(2, () => {
        BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalAwardRequest(e.GetRoleTaskId)
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)) : ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(328)).FunctionMap.set(2, () => {
        UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", void 0, (e, i) => {
          this.AddChildViewById(i)
        })
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n))
    }, this.g3e = e => {
      var i;
      e.has(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId) && (e = () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView)
      }, (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e), i.FunctionMap.set(0, e), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIButtonComponent],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.GH1],
      [5, this.gy1]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Giu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.NH1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Giu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.NH1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e)
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lqe.SetCloseCallBack(() => {
      this.CloseMe()
    }), this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.Bqe);
    var e = this.GetItem(8);
    this.j2e = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent, await this.j2e.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnStart() {
    BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().GetHaveChoseRoleViewEnter() || this.GH1()
  }
  OnBeforeShow() {
    this.Og()
  }
  Og() {
    const t = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var e = t.GetTaskIdListByTypeId(ROLE_TYPE_ID),
      e = (e.sort((e, i) => {
        var n = t.GetTaskDataById(e).H6n,
          r = t.GetTaskDataById(i).H6n;
        return n === r ? e - i : (n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1) - (r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish ? 0 : r === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken ? 2 : 1)
      }), this.xqe.RefreshByData(e), t.ChoseRoleId),
      i = 0 < e,
      i = (this.j2e.SetUiActive(i), i && this.j2e.Update(e), ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(i ? e : ABU_ID));
    for (const [, n] of this.Aou) n.SetUiActive(!1);
    let n = this.Aou.get(e);
    n ? (n.SetUiActive(!0), n.SetAnimation(0, "idle", !0)) : ((n = new BeginnerCarnivalSpineItem).CreateThenShowByResourceIdAsync(i.RoleViewSpineItem, this.GetItem(1)).then(() => {
      n.SetAnimation(0, "idle", !0)
    }), this.Aou.set(e, n));
    var r, o, i = 0 !== t.ChoseRoleId ? ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.ChoseRoleId).Name) : "",
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BeginnerCarnivalGetRoleDes", i), t.GetTaskDataById(t.GetRoleTaskId));
    e && (i = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken, r = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish, o = e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning, this.GetItem(10).SetUIActive(i), this.GetItem(11).SetUIActive(o), this.GetButton(5).RootUIComp.SetUIActive(r), this.GetItem(13).SetUIActive(r), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "BeginnerCarnivalCurrentProgress", e.lMs, e.j6n), this.GetSprite(4).SetFillAmount(e.lMs / e.j6n), this.GetButton(2).RootUIComp.SetUIActive(!i), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "BeginnerCarnivalAllCount", t.GetCurrentItemCount()))
  }
}
exports.BeginnerCarnivalRoleTaskView = BeginnerCarnivalRoleTaskView;
class BeginnerCarnivalSpineItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent]
    ]
  }
  SetAnimation(e, i, n) {
    this.GetSpine(0).SetAnimation(e, i, n)
  }
}
exports.BeginnerCarnivalSpineItem = BeginnerCarnivalSpineItem;
//# sourceMappingURL=BeginnerCarnivalRoleTaskView.js.map