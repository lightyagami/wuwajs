"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssWorldView = exports.DangoAbyssWorldViewData = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  AbyssButtonItem_1 = require("./AbyssButtonItem");
class DangoAbyssWorldViewData {
  constructor() {
    this.ActivityData = void 0
  }
}
exports.DangoAbyssWorldViewData = DangoAbyssWorldViewData;
class DangoAbyssWorldView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.X01 = 0, this.$8i = new DangoAbyssWorldViewData, this._Oc = void 0, this.Eyc = void 0, this.Iyc = void 0, this.AMo = () => {
      ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenCurrentActivityAbyssEntrance() || ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
    }, this.Kco = () => {
      this.o3c()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.AMo]
    ]
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.Kco), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssAddRole, this.Kco)
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Eyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Eyc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.Eyc.BindClickCallBack(() => {
      ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController.OpenCurrentRoleUpView()
    }), this.Iyc = new AbyssButtonItem_1.AbyssButtonItem, e.push(this.Iyc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.Iyc.BindClickCallBack(() => {
      UiManager_1.UiManager.OpenView("DangoAbyssShopView")
    }), this._Oc = new ProgressPanel, e.push(this._Oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(e), this.$8i = this.OpenParam
  }
  RefreshRedDot() {
    this.Iyc?.BindRedDot("RedDotDangoPayShop", this.$8i?.ActivityData?.Id)
  }
  W8e() {
    this.Iyc?.UnBindRedDot()
  }
  OnBeforeShow() {
    this.o3c(), this.RefreshRedDot()
  }
  OnBeforeHide() {
    this.W8e()
  }
  o3c() {
    this._Oc.Refresh(this.$8i.ActivityData)
  }
  Y01() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(10, 1);
    if (0 !== e.length)
      for (const s of e) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.Id);
        if (1 === t || 2 === t) return s.Id
      }
    return 0
  }
  OnTick(e) {
    var t = this.Y01();
    t !== this.X01 && (this.X01 = t, QuestController_1.QuestNewController.RequestTrackQuest(this.X01, !0, 2), t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.X01), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, t.Tree.BtType, t.Tree.TreeIncId))
  }
}
exports.DangoAbyssWorldView = DangoAbyssWorldView;
class ProgressPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite]
    ]
  }
  Refresh(e) {
    var t = e.GetAbyssWorldProgressText(),
      t = (this.GetText(1).SetText(t), e.GetAbyssWorldProgressPercentage());
    this.GetSprite(2).SetFillAmount(t)
  }
}
//# sourceMappingURL=DangoAbyssWorldView.js.map