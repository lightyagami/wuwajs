"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalMainView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
const BeginnerCarnivalRoleTaskView_1 = require("./BeginnerCarnivalRoleTaskView");
const ROLE_TAB_INDEX = 5;
class BeginnerCarnivalMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.$hu = new Map();
    this.y$1 = [];
    this.Rsu = () => {
      this.Og();
    };
    this.S$1 = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalRoleTaskView");
    };
    this.bsu = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalChoseRoleView", undefined, (e, i) => {
        this.AddChildViewById(i);
      });
    };
    this.g3e = e => {
      var i;
      if (e.has(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId)) {
        e = () => {
          UiManager_1.UiManager.ResetToBattleView();
        };
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e);
        i.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIButtonComponent], [10, UE.UIText], [9, UE.UIItem], [7, UE.UIItem], [5, UE.UIButtonComponent], [8, UE.UIItem]];
    this.BtnBindInfo = [[6, this.S$1], [5, this.bsu]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Rsu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshBeginnerCarnivalChoseRole, this.Rsu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    var e = new BeginnerCarnivalTaskType();
    var i = new BeginnerCarnivalTaskType();
    var n = new BeginnerCarnivalTaskType();
    var r = new BeginnerCarnivalTaskType();
    await Promise.all([e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), n.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), r.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
    this.y$1.push(e, i, n, r);
  }
  OnStart() {
    var e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var i = e.ChoseRoleId;
    if (!e.GetHaveChoseRoleViewEnter() && i <= 0) {
      this.bsu();
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    let e = 0;
    for (const o of this.y$1) {
      e++;
      o.RefreshItem(e);
    }
    var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData();
    var n = i.GetTaskDataById(i.GetRoleTaskId);
    if (n) {
      var n = n.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
      var r = i.ChoseRoleId;
      var t = r > 0;
      this.GetItem(8).SetUIActive(!t);
      if (t) {
        var a;
        var t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(r);
        for ([, a] of this.$hu) {
          a.SetUiActive(false);
        }
        let e = this.$hu.get(r);
        if (e) {
          e.SetUiActive(true);
          e.SetAnimation(0, "idle", true);
        } else {
          (e = new BeginnerCarnivalRoleTaskView_1.BeginnerCarnivalSpineItem()).CreateThenShowByResourceIdAsync(t.MainViewSpineItem, this.GetItem(7)).then(() => {
            e.SetAnimation(0, "idle", true);
          });
          this.$hu.set(r, e);
        }
      }
      t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId);
      this.GetText(10).SetText(`<color=#f5cf47>${i.GetCurrentItemCount()}</color>/${t?.AllCount}`);
      this.GetItem(9).SetUIActive(i.GetRoleGetTaskTabRedDotShow(ROLE_TAB_INDEX));
      this.GetButton(5).RootUIComp.SetUIActive(!n);
    }
  }
}
exports.BeginnerCarnivalMainView = BeginnerCarnivalMainView;
class BeginnerCarnivalTaskType extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.q8e = 0;
    this.YP = () => {
      UiManager_1.UiManager.OpenView("BeginnerCarnivalTaskView", this.q8e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  RefreshItem(e) {
    this.q8e = e;
    var e = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().GetProgress(this.q8e);
    var i = e[0] === e[1];
    this.GetText(1).SetUIActive(!i);
    this.GetItem(2).SetUIActive(i);
    if (!i) {
      this.GetText(1).SetText(`<color=#f5cf47>${e[0]}</color>/${e[1]}`);
    }
    RedDotController_1.RedDotController.BindRedDot("BeginnerCarnivalTaskTabRedDot", this.GetItem(3), undefined, this.q8e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshBeginnerCarnivalTask, this.q8e);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BeginnerCarnivalTaskTabRedDot", this.GetItem(3), this.q8e);
  }
}
//# sourceMappingURL=BeginnerCarnivalMainView.js.map