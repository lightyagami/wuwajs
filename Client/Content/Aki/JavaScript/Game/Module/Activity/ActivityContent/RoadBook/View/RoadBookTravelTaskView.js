"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaLayoutItemData = exports.RoadBookTravelTaskView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const UiNavigationNewController_1 = require("../../../../UiNavigation/New/UiNavigationNewController");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const DynScrollView_1 = require("../../../../Util/ScrollView/DynScrollView");
const ActivityRoadBookDefine_1 = require("../../RoadBook/ActivityRoadBookDefine");
const ActivitySmallItemGrid_1 = require("../../UniversalComponents/ActivitySmallItemGrid");
const ActivityRoadBookController_1 = require("../ActivityRoadBookController");
const RoadBookTabDynamicItem_1 = require("./RoadBookTabDynamicItem");
const RoadBookTabDynamicScrollItem_1 = require("./RoadBookTabDynamicScrollItem");
const RoadBookTaskItem_1 = require("./RoadBookTaskItem");
class RoadBookTravelTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Otl = undefined;
    this.b4c = undefined;
    this.AreaLayoutList = undefined;
    this.LevelSequencePlayer = undefined;
    this.TabLayout = undefined;
    this.MVl = undefined;
    this.EVl = [];
    this.fVl = -1;
    this.B5l = false;
    this.Gbf = 0;
    this.E6f = [];
    this.I6f = (t, i, e) => {
      return new AreaLayout(this.b4c);
    };
    this.Hwn = (t, i, e) => {
      var s = new RoadBookTabDynamicScrollItem_1.RoadBookTabDynamicScrollItem(this.b4c);
      s.BindSelectedCallBack(this.pVl);
      s.BindIsSelectedOn(this.IVl);
      return s;
    };
    this.OnRoadBookTaskNavigationNext = () => {
      var t = this.AreaLayoutList.GetScrollItemFromIndex(this.fVl)?.GetFirstItem();
      if (t) {
        UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(t);
      }
    };
    this.RefreshCurrent = () => {
      this.MVl?.Refresh();
      var t = this.b4c.GetAllAreaData().filter(t => t.TravelTaskIdSet.size > 0);
      this.TabLayout.RefreshByData(t);
      var t = this.T6f(t);
      this.AreaLayoutList.RefreshByData(t);
    };
    this.TVl = () => {
      var t;
      var i;
      var e;
      var s;
      var h;
      var r;
      var o;
      var a;
      if (!this.B5l) {
        a = this.TabLayout.GetDisplayGridStartIndex();
        t = this.TabLayout.GetDisplayGridEndIndex();
        if ((i = this.Fbf()) !== -1) {
          this.XN(this.fVl, false, false);
          h = (s = (e = this.GetUIDynScrollViewComponent(2)).ContentUIItem.GetAnchorOffsetY()) + e.RootUIComp.Height;
          o = (r = this.TabLayout.GetGrid(i)).GetAnchorOffsetY();
          if (i < a || t < i || -o + r.GetHeight() > h || -o < s) {
            a = i === 0 ? 0 : (i + 1) / (this.EVl.length - 1);
            e.SetScrollProgress(a);
          }
          this.fVl = i;
          this.XN(this.fVl, true, false);
        }
      }
    };
    this.pVl = (t, i) => {
      if (i !== this.fVl) {
        this.XN(this.fVl, false, false);
      }
      this.fVl = i;
      this.GetUIDynScrollViewComponent(4).StopMovement();
      this.q5l(i);
    };
    this.IVl = (t, i) => this.fVl === i;
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.b4c.LocalConfig.HelpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIDynScrollViewComponent], [3, UE.UIItem], [4, UE.UIDynScrollViewComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.b4c = this.OpenParam;
    var t = [];
    this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
    this.Otl.SetHelpCallBack(this.pcr);
    t.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Otl.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.MVl = new RewardPanel(this.b4c);
    t.push(this.MVl.CreateByActorAsync(this.GetItem(1).GetOwner()));
    this.AddChild(this.MVl);
    this.AreaLayoutList = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(4), this.GetItem(5), new AreaLayoutBaseItem(), this.I6f);
    t.push(this.AreaLayoutList.Init());
    var i = this.GetUIDynScrollViewComponent(4);
    if (i) {
      i.OnScrollValueChange.Bind(this.TVl);
    }
    this.TabLayout = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(2), this.GetItem(3), new RoadBookTabDynamicItem_1.RoadBookTabDynamicItem(), this.Hwn);
    t.push(this.TabLayout.Init());
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await Promise.all(t);
    this.bl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoadBookTaskRefresh, this.RefreshCurrent);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoadBookTaskNavigationNext, this.OnRoadBookTaskNavigationNext);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoadBookTaskRefresh, this.RefreshCurrent);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoadBookTaskNavigationNext, this.OnRoadBookTaskNavigationNext);
  }
  OnStart() {}
  async bl() {
    var i = this.b4c.GetAllAreaData().filter(t => t.TravelTaskIdSet.size > 0);
    let e = 0;
    let s = false;
    for (let t = 0; t < i.length; t++) {
      if (this.b4c.GetAreaNewUnlockState(i[t].AreaId)) {
        this.b4c.SaveFirstCheckRedDotState(5, i[t].AreaId);
        if (!s) {
          e = t;
          s = true;
        }
      }
    }
    this.TabLayout.RefreshByData(i);
    var h = this.T6f(i);
    this.E6f = [];
    for (let t = 0; t < h.length; t++) {
      if (h[t].IsTitle) {
        this.E6f.push(t);
      }
    }
    this.bVl(h);
    this.AreaLayoutList.RefreshByData(h, false, false);
    await this.AreaLayoutList.WaitForInit();
    var t = (this.fVl = e) === 0 ? 0 : (e + 1) / (this.EVl.length - 1);
    this.GetUIDynScrollViewComponent(2).SetScrollProgress(t);
    this.XN(e, true, false);
    this.AreaLayoutList.BindLateUpdate(() => {
      var t;
      this.q5l(e);
      if (s && (t = this.E6f[e], t = this.AreaLayoutList?.GetScrollItemFromIndex(t))) {
        t.PlayUnlockAnim();
      }
      this.AreaLayoutList.UnBindLateUpdate();
    });
  }
  T6f(t) {
    var i = [];
    for (const e of t) {
      i.push(new AreaLayoutItemData(true, e));
      if (e.IsUnlock) {
        for (const s of this.b4c.GetAreaTaskDataList(e.AreaId)) {
          i.push(new AreaLayoutItemData(false, e, s));
        }
      }
    }
    return i;
  }
  bVl(i) {
    this.EVl.length = 0;
    var t;
    var e = this.GetUIDynScrollViewComponent(4).RootUIComp.GetHeight();
    var s = this.GetUIDynScrollViewComponent(4).SpacingVertical;
    let h = 0;
    let r = 0;
    this.EVl.push(-MathUtils_1.MathUtils.Int32Max);
    for (let t = 0; t < i.length; t++) {
      var o = this.AreaLayoutList.GetItemSizeFromData(i[t]).Y;
      if (t === i.length - 1) {
        h += o;
        r += o;
      } else {
        h += o + s;
        r += o + s;
      }
      if (t > 0 && i[t].IsTitle) {
        this.EVl.push(h - o);
        r = o;
      }
    }
    this.EVl.push(MathUtils_1.MathUtils.Int32Max);
    if (r < e) {
      t = e - r;
      i[i.length - 1].ExtraHeight = t;
    }
    this.Gbf = e;
  }
  XN(t, i, e) {
    this.TabLayout.GetScrollItemFromIndex(t)?.SetSelected(i, e);
  }
  Fbf() {
    var i = this.GetUIDynScrollViewComponent(4).ContentUIItem.GetAnchorOffsetY();
    if (this.EVl[this.fVl] < i + this.Gbf && this.EVl[this.fVl + 1] > i) {
      return -1;
    }
    let e = -1;
    if ((i > this.EVl[this.fVl] ? 1 : -1) > 0) {
      for (let t = this.fVl + 1; t < this.EVl.length; t++) {
        if (this.EVl[t] <= i + this.Gbf && i < this.EVl[t + 1]) {
          e = t;
          break;
        }
      }
    } else {
      for (let t = this.fVl - 1; t >= 0; t--) {
        if (this.EVl[t] <= i + this.Gbf && i < this.EVl[t + 1]) {
          e = t;
          break;
        }
      }
    }
    return e;
  }
  q5l(t) {
    t = this.E6f[t];
    this.GetUIDynScrollViewComponent(4).ScrollToItemIndex(t);
  }
  async PlayStartSequence() {
    this.B5l = true;
    this.bl();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", new CustomPromise_1.CustomPromise(), true);
    this.B5l = false;
  }
  async PlayCloseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise(), true);
    this.yjl();
  }
  yjl() {
    this.XN(this.fVl, false, false);
    this.fVl = -1;
  }
}
exports.RoadBookTravelTaskView = RoadBookTravelTaskView;
class RewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.gOe = undefined;
    this.UFe = () => {
      ActivityRoadBookController_1.ActivityRoadBookController.RequestTakeTaskFinalReward();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.UFe]];
  }
  async OnBeforeStartAsync() {
    var t = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    await t.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.gOe = t;
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    var t = this.ActivityBaseData.GetActivityConfig();
    var i = this.ActivityBaseData.TaskFinalRewardData;
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.FinalRewardId)[0];
    var e = i.Current === i.Target;
    var s = i.IsReceived;
    this.GetSprite(3).SetFillAmount(i.Current / i.Target);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "MapTravelAllTaskProgress_Text", i.Current, i.Target);
    this.GetButton(1).RootUIComp.SetUIActive(e && !s);
    this.GetItem(4).SetUIActive(!e);
    this.GetItem(2).SetUIActive(s);
    var i = {
      Item: t,
      HasClaimed: s
    };
    this.gOe.Refresh(i);
  }
}
class AreaLayoutItemData {
  constructor(t, i, e) {
    this.IsTitle = false;
    this.AreaData = undefined;
    this.TaskData = undefined;
    this.ExtraHeight = undefined;
    this.IsTitle = t;
    this.AreaData = i;
    this.TaskData = e;
  }
}
exports.AreaLayoutItemData = AreaLayoutItemData;
class AreaLayoutBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IGe = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    this.IGe = new Vector2D_1.Vector2D();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIVerticalLayout]];
  }
  GetItemSize(t) {
    var i = this.RootItem.Width;
    if (t.IsTitle) {
      this.IGe.Set(i, this.GetVerticalLayout(4).RootUIComp.Height);
      if (!t.AreaData.IsUnlock) {
        this.IGe.Y += this.GetItem(3).GetHeight() + this.GetVerticalLayout(4).GetSpacing();
      }
    } else {
      this.IGe.Set(i, this.GetItem(1).GetHeight());
    }
    this.IGe.Y += t.ExtraHeight ?? 0;
    return this.IGe.ToUeVector2D(true);
  }
  ClearItem() {}
}
class AreaLayout extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.ActivityBaseData = t;
    this.TaskLayout = undefined;
    this.LevelSequencePlayer = undefined;
    this.fuo = undefined;
    this.JZ = undefined;
    this.xOl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture]];
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    this.fuo = new RoadBookTaskItem_1.RoadBookTaskLockItem(this.ActivityBaseData);
    this.JZ = new RoadBookTaskItem_1.RoadBookTaskNormalItem(this.ActivityBaseData);
    await Promise.all([this.fuo.CreateByActorAsync(this.GetItem(3).GetOwner()), this.JZ.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())]);
    this.JZ.SetBtnClickCallback(() => {
      var t = this.ActivityBaseData.GetAreaTaskDataList(this.xOl.AreaId).filter(t => t.Status === 0).map(t => t.Id);
      if (t) {
        ActivityRoadBookController_1.ActivityRoadBookController.RequestMultiRoadBookTaskReward(t);
      }
    });
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Update(t, i) {
    this.Refresh(t);
  }
  Refresh(t) {
    this.xOl = t.AreaData;
    if (t.IsTitle) {
      this.mGe(t.AreaData);
    } else {
      this.iOe(t.TaskData);
    }
  }
  mGe(t) {
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId);
    this.GetItem(4).SetUIActive(true);
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Title);
    let e = true;
    for (const s of t.TravelTaskIdSet) {
      if (this.ActivityBaseData.AreaTaskMap.get(s).Status !== 2) {
        e = false;
        break;
      }
    }
    this.GetText(0).SetChangeColor(!t.IsUnlock, this.GetText(0).changeColor);
    this.GetTexture(7).SetChangeColor(!t.IsUnlock, this.GetTexture(7).changeColor);
    this.GetItem(3).SetUIActive(!t.IsUnlock);
    this.GetItem(6).SetUIActive(e);
    if (!t.IsUnlock) {
      i = new ActivityRoadBookDefine_1.RoadBookLockAreaData(t.AreaId);
      t = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetAreaConfig(t.AreaId);
      i.ConditionGroupId = t.UnLockCondition;
      i.JumpId = t.UnlockAccessId;
      this.fuo.Refresh(i);
    }
  }
  iOe(t) {
    this.GetItem(4).SetUIActive(false);
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(true);
    this.JZ.Refresh(t);
  }
  PlayUnlockAnim() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Unlock", true);
  }
  GetFirstItem() {
    return this.TaskLayout.GetItemByIndex(0);
  }
  GetUsingItem(t) {
    return (t.IsTitle ? this.GetItem(4) : this.GetRootItem()).GetOwner();
  }
  ClearItem() {}
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
    this.fuo = undefined;
    this.JZ = undefined;
    this.xOl = undefined;
  }
}
//# sourceMappingURL=RoadBookTravelTaskView.js.map