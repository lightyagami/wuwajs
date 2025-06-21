"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalMainView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  BeginnerCarnivalController_1 = require("./BeginnerCarnivalController"),
  BeginnerCarnivalRoleTaskView_1 = require("./BeginnerCarnivalRoleTaskView"),
  ROLE_TAB_INDEX = 5;
class BeginnerCarnivalMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.Aou = new Map, this.OH1 = [], this.Giu = () => {
      this.Og()
    }, this.qH1 = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalRoleTaskView")
    }, this.qiu = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", void 0, (e, i) => {
        this.AddChildViewById(i)
      })
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
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [6, UE.UIButtonComponent],
      [10, UE.UIText],
      [9, UE.UIItem],
      [7, UE.UIItem],
      [5, UE.UIButtonComponent],
      [8, UE.UIItem]
    ], this.BtnBindInfo = [
      [6, this.qH1],
      [5, this.qiu]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Giu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Giu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e)
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lqe.SetCloseCallBack(() => {
      this.CloseMe()
    });
    var e = new BeginnerCarnivalTaskType,
      i = new BeginnerCarnivalTaskType,
      n = new BeginnerCarnivalTaskType,
      r = new BeginnerCarnivalTaskType;
    await Promise.all([e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), n.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), r.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]), this.OH1.push(e, i, n, r)
  }
  OnStart() {
    BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().GetHaveChoseRoleViewEnter() || this.qiu()
  }
  OnBeforeShow() {
    this.Og()
  }
  Og() {
    let e = 0;
    for (const a of this.OH1) e++, a.RefreshItem(e);
    var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData(),
      n = i.GetTaskDataById(i.GetRoleTaskId);
    if (n) {
      var n = n.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken,
        r = i.ChoseRoleId,
        t = 0 < r;
      if (this.GetItem(8).SetUIActive(!t), t) {
        var o, t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(r);
        for ([, o] of this.Aou) o.SetUiActive(!1);
        let e = this.Aou.get(r);
        e ? (e.SetUiActive(!0), e.SetAnimation(0, "idle", !0)) : ((e = new BeginnerCarnivalRoleTaskView_1.BeginnerCarnivalSpineItem).CreateThenShowByResourceIdAsync(t.MainViewSpineItem, this.GetItem(7)).then(() => {
          e.SetAnimation(0, "idle", !0)
        }), this.Aou.set(r, e))
      }
      t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId);
      this.GetText(10).SetText(`<color=#f5cf47>${i.GetCurrentItemCount()}</color>/` + t?.AllCount), this.GetItem(9).SetUIActive(i.GetRoleGetTaskTabRedDotShow(ROLE_TAB_INDEX)), this.GetButton(5).RootUIComp.SetUIActive(!n)
    }
  }
}
exports.BeginnerCarnivalMainView = BeginnerCarnivalMainView;
class BeginnerCarnivalTaskType extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.q8e = 0, this.YP = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalTaskView", this.q8e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.YP]
    ]
  }
  RefreshItem(e) {
    this.q8e = e;
    var e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().GetProgress(this.q8e),
      i = e[0] === e[1];
    this.GetText(1).SetUIActive(!i), this.GetItem(2).SetUIActive(i), i || this.GetText(1).SetText(`<color=#f5cf47>${e[0]}</color>/` + e[1]), RedDotController_1.RedDotController.BindRedDot("BeginnerCarnivalTaskTabRedDot", this.GetItem(3), void 0, this.q8e)
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BeginnerCarnivalTaskTabRedDot", this.GetItem(3), this.q8e)
  }
}
//# sourceMappingURL=BeginnerCarnivalMainView.js.map