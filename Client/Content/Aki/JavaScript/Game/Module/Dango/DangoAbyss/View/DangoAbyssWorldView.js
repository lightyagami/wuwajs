"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssWorldView = exports.DangoAbyssWorldViewData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const AbyssButtonItem_1 = require("./AbyssButtonItem");
class DangoAbyssWorldViewData {
  constructor() {
    this.ActivityData = undefined;
  }
}
exports.DangoAbyssWorldViewData = DangoAbyssWorldViewData;
class DangoAbyssWorldView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.vp1 = 0;
    this.$8i = new DangoAbyssWorldViewData();
    this._Oc = undefined;
    this.Eyc = undefined;
    this.Iyc = undefined;
    this.AMo = () => {
      if (!ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance()) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
    this.Kco = () => {
      this.o3c();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Eyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Eyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Eyc.BindClickCallBack(() => {
      ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView();
    });
    this.Iyc = new AbyssButtonItem_1.AbyssButtonItem();
    e.push(this.Iyc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Iyc.BindClickCallBack(() => {
      UiManager_1.UiManager.OpenView("DangoAbyssShopView");
    });
    this._Oc = new ProgressPanel();
    e.push(this._Oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(e);
    this.$8i = this.OpenParam;
  }
  RefreshRedDot() {
    this.Iyc?.BindRedDot("RedDotDangoPayShop", this.$8i?.ActivityData?.Id);
  }
  W8e() {
    this.Iyc?.UnBindRedDot();
  }
  OnBeforeShow() {
    this.o3c();
    this.RefreshRedDot();
  }
  OnBeforeHide() {
    this.W8e();
  }
  o3c() {
    this._Oc.Refresh(this.$8i.ActivityData);
  }
  yp1() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1);
    if (e.length !== 0) {
      for (const s of e) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.Id);
        if (t === 1 || t === 2) {
          return s.Id;
        }
      }
    }
    return 0;
  }
  OnTick(e) {
    var t = this.yp1();
    if (t !== this.vp1) {
      this.vp1 = t;
      QuestController_1.QuestNewController.RequestTrackQuest(this.vp1, true, 2);
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.vp1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, t.Tree.BtType, t.Tree.TreeIncId);
    }
  }
}
exports.DangoAbyssWorldView = DangoAbyssWorldView;
class ProgressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  Refresh(e) {
    var t = e.GetAbyssWorldProgressText();
    this.GetText(1).SetText(t);
    var t = e.GetAbyssWorldProgressPercentage();
    this.GetSprite(2).SetFillAmount(t);
  }
}
//# sourceMappingURL=DangoAbyssWorldView.js.map