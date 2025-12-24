"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookVehicleTaskView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRoadBookController_1 = require("../ActivityRoadBookController");
const RoadBookTaskItem_1 = require("./RoadBookTaskItem");
class RoadBookVehicleTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Otl = undefined;
    this.b4c = undefined;
    this.LevelSequencePlayer = undefined;
    this.j9m = undefined;
    this.OOe = undefined;
    this.fVl = -1;
    this.H9m = undefined;
    this.hkf = () => {
      var t = this.b4c.GetAllMotorTabData()[this.fVl];
      this.Q9m();
      this.Dke(t);
    };
    this.$9m = () => {
      var t = new TabGroupGridItem();
      t.OnChildToggleCallback = this.W9m;
      return t;
    };
    this.kou = () => {
      var t = new RoadBookTaskItem_1.MotorChallengeItem(this.b4c);
      t.SetClickRewardCb(this.GKc);
      return t;
    };
    this.GKc = () => {
      var t = this.b4c.GetAllMotorTabData()[this.fVl];
      var t = this.b4c.GetMotorItemDataList(t.RewardIds).filter(t => t.Status === 0).map(t => t.Id);
      ActivityRoadBookController_1.ActivityRoadBookController.RequestMultiTakeMotorChallengeReward(t);
    };
    this.W9m = (t, i) => {
      if (this.H9m) {
        this.H9m.SetIsSelect(false);
      }
      this.H9m = i;
      this.H9m.SetIsSelect(true);
      if (this.fVl !== t.TabIndex) {
        this.fVl = t.TabIndex;
        if (t.IsUnlock && !this.b4c.SaveFirstCheckRedDotState(7, t.PlayId)) {
          i.SetItemNewVisible(false);
        }
        this.Dke(t);
      }
    };
    this.syd = () => {
      for (const t of this.b4c.GetAllMotorTabData()) {
        if (t.TabIndex === this.fVl) {
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.JumpId);
          return;
        }
      }
    };
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.b4c.LocalConfig.HelpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this.syd]];
  }
  async OnBeforeStartAsync() {
    this.b4c = this.OpenParam;
    this.j9m = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.$9m, undefined, true);
    this.OOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.kou);
    var t = [];
    this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
    this.Otl.SetHelpCallBack(this.pcr);
    t.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Otl.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await Promise.all(t);
    await this.Q9m();
    this.j9m.GetScrollItemByIndex(0)?.SelectFirstTab();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoadBookMotorRefresh, this.hkf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoadBookMotorRefresh, this.hkf);
  }
  async Q9m() {
    var t = this.b4c.GetAllMotorTabData();
    var i = new Map();
    for (const h of t) {
      var e = h.ClassId;
      if (!i.has(e)) {
        i.set(e, []);
      }
      i.get(e).push(h);
    }
    const s = [];
    const r = this.b4c.GetActivityConfig();
    i.forEach((t, i) => {
      t.sort((t, i) => t.IsFinished !== i.IsFinished ? t.IsFinished ? 1 : -1 : t.TabIndex - i.TabIndex);
      s.push({
        TabDataList: t,
        GroupTitleId: r.VehicleClassificationName.get(i)
      });
    });
    await this.j9m.RefreshByDataAsync(s);
  }
  Dke(t) {
    var i = t.IsUnlock;
    var e = i ? this.b4c.GetMotorItemDataList(t.RewardIds) : [];
    this.GetItem(5)?.SetUIActive(!i);
    if (!i) {
      this.GetText(6)?.ShowTextNew(this.b4c.GetMotorPlayLockTips(t.PlayId));
    }
    this.GetItem(7)?.SetUIActive(i);
    this.OOe.RefreshByData(e, undefined, true);
  }
}
exports.RoadBookVehicleTaskView = RoadBookVehicleTaskView;
class TabGroupGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnChildToggleCallback = undefined;
    this.B7t = undefined;
    this.Pe = undefined;
    this.u6t = () => {
      var t = new TabGridItem();
      t.OnChildToggleCallback = this.OnChildToggleCallback;
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.B7t = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.u6t);
  }
  async RefreshAsync(t, i, e) {
    this.Pe = t;
    this.GetText(2).ShowTextNew(t.GroupTitleId ?? "");
    await this.B7t.RefreshByDataAsync(this.Pe.TabDataList);
  }
  SelectFirstTab() {
    this.B7t.SelectGridProxy(0, true);
  }
}
class TabGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnChildToggleCallback = undefined;
    this.X9m = undefined;
    this.Y9m = undefined;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.X9m = new MenuTabToggleItem();
    this.Y9m = new MenuTabToggleItem();
    t.push(this.X9m.CreateByActorAsync(this.GetItem(0).GetOwner()));
    t.push(this.Y9m.CreateByActorAsync(this.GetItem(1).GetOwner()));
    this.X9m.OnChildToggleCallback = this.OnChildToggleCallback;
    this.Y9m.OnChildToggleCallback = this.OnChildToggleCallback;
    await Promise.all(t);
  }
  SetItemNewVisible(t) {
    if (this.Pe.IsUnlock) {
      this.X9m.SetItemNewVisible(t);
    }
  }
  Refresh(t, i, e) {
    ((this.Pe = t).IsUnlock ? this.X9m : this.Y9m).Refresh(t);
    (this.Pe.IsUnlock ? this.X9m : this.Y9m).SetIsSelect(i, false);
    this.GetItem(0)?.SetUIActive(t.IsUnlock);
    this.GetItem(1)?.SetUIActive(!t.IsUnlock);
  }
  OnSelected(t) {
    (this.Pe.IsUnlock ? this.X9m : this.Y9m).SetIsSelect(true, t);
  }
}
class MenuTabToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnChildToggleCallback = undefined;
    this.Pe = undefined;
    this.z9m = t => {
      this.OnChildToggleCallback?.(this.Pe, this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.z9m]];
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke.bind(this));
  }
  Lke() {
    return true;
  }
  Refresh(t) {
    this.Pe = t;
    this.GetText(1)?.ShowTextNew(t.NameTextId);
    this.GetSprite(2).SetUIActive(t.IsFinished);
    this.GetSprite(3).SetUIActive(!t.IsUnlock);
    this.GetItem(4).SetUIActive(t.HasRedDot);
    this.GetItem(5).SetUIActive(t.IsUnlock && t.IsNew && !t.HasRedDot);
  }
  SetItemNewVisible(t) {
    this.GetItem(5).SetUIActive(t);
  }
  SetIsSelect(t, i = false) {
    this.GetExtendToggle(0)?.SetToggleStateForce(t ? 1 : 0);
    if (i) {
      this.OnChildToggleCallback?.(this.Pe, this);
    }
  }
}
//# sourceMappingURL=RoadBookVehicleTaskView.js.map