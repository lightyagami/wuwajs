"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryFragmentMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiBlurLogic_1 = require("../../Ui/Base/UiBlur/UiBlurLogic");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const MapDefine_1 = require("../Map/MapDefine");
const PhotographController_1 = require("../Photograph/PhotographController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
const FragmentMemoryController_1 = require("./FragmentMemoryController");
class MemoryFragmentMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Bwn = undefined;
    this.lqe = undefined;
    this.xqe = undefined;
    this.b9i = 0;
    this.H3e = undefined;
    this.bwn = false;
    this.qwn = false;
    this.SPe = undefined;
    this.DNn = 0;
    this.$Gn = () => {
      var e = this.xqe.GetDisplayGridStartIndex();
      var i = this.Bwn.GetCollectDataList();
      let r = 0;
      for (let t = 0; t < e; t++) {
        if (i[t].GetIfCanGetReward()) {
          r = t;
        }
      }
      this.xqe?.ScrollToGridIndexWithTween(r);
      var t = r !== this.b9i;
      this.b9i = r;
      this.Og();
      if (t) {
        this.I3e();
      }
    };
    this.UNn = () => {
      var t = this.kwn().GetQuestList();
      if (t.length > 0) {
        for (const s of t) {
          var e = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(s);
          if (!e) {
            if (ModelManager_1.ModelManager.QuestNewModel.GetQuest(s)) {
              UiManager_1.UiManager.OpenView("QuestView", s);
              return;
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_FragmentQuest"));
              return;
            }
          }
        }
      }
      ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity();
      this.DNn = 0;
      var t = this.kwn().GetTraceEntityId();
      var i = this.kwn().GetTrackMapId();
      var r = this.kwn().GetTraceMarkId();
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityData(t, i)?.Transform?.Pos) {
        t = new MapDefine_1.DynamicMarkCreateInfo({
          TrackTarget: t,
          MarkConfigId: r,
          MarkType: 7,
          DestroyOnUnTrack: true,
          MapAndDungeonInfo: {
            MapConfigId: i
          }
        });
        if (this.DNn === 0) {
          this.DNn = ModelManager_1.ModelManager.MapModel.CreateMapMark(t);
        }
        r = {
          MarkId: this.DNn,
          MarkType: 7
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, r);
        ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackMapMarkId = this.DNn;
        ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackFragmentId = this.kwn().GetId();
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("FragmentMemory", 27, "没有找到实体");
      }
    };
    this.YGn = () => {
      var e = this.xqe.GetDisplayGridEndIndex();
      var i = this.Bwn.GetCollectDataList();
      let r = e;
      var s = i.length;
      for (let t = e; t <= s - 1; t++) {
        if (i[t].GetIfCanGetReward()) {
          r = t;
          break;
        }
      }
      this.xqe?.ScrollToGridIndexWithTween(r);
      e = r !== this.b9i;
      this.b9i = r;
      this.Og();
      if (e) {
        this.I3e();
      }
    };
    this.$Ge = () => {
      this.qbn();
    };
    this.Gwn = () => {
      this.Bwn = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(this.Bwn.GetId());
      this.Og();
    };
    this.Own = () => {
      this.Bwn = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(this.Bwn.GetId());
      this.Og();
    };
    this.Nwn = () => {
      var t = this.kwn();
      FragmentMemoryController_1.FragmentMemoryController.RequestMemoryReward([t.GetId()]);
    };
    this.Fwn = () => {
      PhotographController_1.PhotographController.ScreenShot({
        ScreenShot: true,
        PrepareFullScreenShot: false,
        IsHiddenBattleView: false,
        HandBookPhotoData: undefined,
        GachaData: undefined,
        FragmentMemory: this.kwn(),
        RoleSkinData: undefined
      });
    };
    this.Vwn = () => {
      UiManager_1.UiManager.OpenView("FragmentedCluesView", this.kwn());
    };
    this.UMt = () => {
      return new GridItem();
    };
    this.Hwn = () => new TabItem();
    this.pFe = () => {
      this.CloseMe();
    };
    this.jwn = () => this.b9i;
    this.Wwn = t => {
      var e = t !== this.b9i;
      this.b9i = t;
      this.Og(true);
      if (e) {
        this.I3e();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.Nwn], [13, this.Fwn], [14, this.Vwn], [15, this.$Gn], [16, this.YGn], [17, this.UNn]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetScrollViewWithScrollbar(8).GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()), this.UMt);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.pFe);
    this.lqe.SetHelpBtnActive(false);
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.Hwn);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetButton(16)?.RootUIComp.SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = this.OpenParam;
    if (e) {
      this.Bwn = e.FragmentMemoryTopicData;
    }
    if (e?.CurrentSelectId > 0) {
      var i = this.Bwn.GetCollectDataList();
      for (let t = 0; t < i.length; t++) {
        if (i[t].GetId() === e.CurrentSelectId) {
          this.b9i = t;
          break;
        }
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate, this.Own);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFragmentMemoryDataUpdate, this.Gwn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate, this.Own);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFragmentMemoryDataUpdate, this.Gwn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnAfterHide() {
    UE.LGUIBPLibrary.ResetGlobalBlurUIItem(GlobalData_1.GlobalData.GameInstance.GetWorld());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeActivityViewNeedBlurState, true);
  }
  kwn() {
    return this.Bwn.GetCollectDataList()[this.b9i];
  }
  OnBeforeShow() {
    this.lqe?.SetTitleByTextIdAndArgNew(this.Bwn.GetConfig().Title);
    this.Og();
    this.Nqe();
    this.ROn();
    if (this.b9i > 0) {
      this.xqe?.ScrollToGridIndex(this.b9i);
    }
  }
  ROn() {
    if (!StringUtils_1.StringUtils.IsEmpty(ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation)) {
      this.SPe?.PlaySequencePurely(ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation);
      ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation = "";
    }
  }
  OnAfterShow() {
    this.qbn();
  }
  Og(t = false) {
    this.Esi(t);
    this.Z3e();
    this.mGe();
    this.Aqe();
    this.Pqe();
    this.Kwn();
    this.e6e();
    this.Qwn();
    this.WTt();
    this.mKi();
    this.Xwn();
    this.H3i();
    this.qbn();
  }
  qbn() {
    if (this.kwn()?.GetIfUnlock()) {
      UE.LGUIBPLibrary.ResetGlobalBlurUIItem(GlobalData_1.GlobalData.GameInstance.GetWorld());
    } else {
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this);
    }
  }
  Nqe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "FragmentCollectProgress", this.Bwn.GetFinishCollectNum(), this.Bwn.GetMemoryCollectNum());
  }
  Esi(t = false) {
    var e = this.Bwn.GetCollectDataList();
    const i = [];
    for (const s of e) {
      var r = new TabItemData();
      r.FragmentCollectData = s;
      r.TabCallBack = this.Wwn;
      r.GetCurrentSelectTabIndex = this.jwn;
      r.NeedSwitchAnimation = t;
      i.push(r);
    }
    this.xqe?.RefreshByData(i, false, () => {
      i.forEach(t => {
        t.NeedSwitchAnimation = false;
      });
    });
  }
  Z3e() {
    var t = this.kwn();
    var e = [];
    for (const r of t.GetPreviewReward()) {
      var i = new GridItemData();
      i.Data = r;
      i.GetRewardState = t.GetIfGetReward();
      e.push(i);
    }
    this.H3e?.RefreshByData(e);
  }
  I3e() {
    if (this.SPe?.GetCurrentSequence() === "Switch") {
      this.SPe?.ReplaySequenceByKey("Switch");
    } else {
      this.SPe?.PlayLevelSequenceByName("Switch");
    }
  }
  mGe() {
    var t;
    var e = this.kwn();
    if (e !== undefined) {
      t = this.GetText(5);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTitle());
    }
  }
  Pqe() {
    var t;
    var e = this.kwn();
    if (e !== undefined) {
      (t = this.GetText(7))?.SetUIActive(true);
      if (e.GetIfUnlock()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetDesc());
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTipsDesc());
      }
    }
  }
  Aqe() {
    var t;
    var e = this.kwn();
    if (e !== undefined) {
      t = this.GetTexture(1);
      this.SetTextureByPath(e.GetBgResource(), t, "MemoryFragmentMainView");
      t?.SetChangeColor(!e.GetIfUnlock(), t.changeColor);
    }
  }
  Kwn() {
    var t = this.kwn();
    if (t !== undefined) {
      this.GetButton(9)?.RootUIComp.SetUIActive(!t.GetIfGetReward() && t.GetIfUnlock());
    }
  }
  e6e() {
    var t = this.kwn();
    if (t !== undefined) {
      this.GetItem(10)?.SetUIActive(t.GetIfGetReward());
    }
  }
  Qwn() {
    var i = this.kwn();
    if (i !== undefined) {
      var r = !i.GetIfGetReward() && !i.GetIfUnlock();
      let t = false;
      let e = false;
      if (r && (i.GetTraceEntityId() > 0 && (t = true), i.GetQuestList().length > 0)) {
        e = true;
      }
      i = t || e;
      this.GetItem(11)?.SetUIActive(r && !i);
      this.GetButton(17)?.RootUIComp.SetUIActive(r && i);
    }
  }
  WTt() {
    var t = this.kwn();
    if (t !== undefined) {
      this.GetItem(12)?.SetUIActive(!t.GetIfUnlock());
    }
  }
  mKi() {
    var t = this.kwn();
    if (t !== undefined) {
      this.GetButton(13)?.RootUIComp.SetUIActive(t.GetIfUnlock());
    }
  }
  OnTick(t) {
    if (this.Bwn) {
      var r = this.xqe.GetDisplayGridStartIndex();
      var s = this.xqe.GetDisplayGridEndIndex();
      var h = this.Bwn.GetCollectDataList();
      let e = false;
      for (let t = 0; t < r; t++) {
        if (h[t].GetIfCanGetReward()) {
          e = true;
          break;
        }
      }
      if (this.bwn !== e) {
        this.GetButton(15)?.RootUIComp.SetUIActive(e);
        this.bwn = e;
      }
      let i = false;
      var o = h.length;
      for (let t = s; t <= o - 1; t++) {
        if (h[t].GetIfCanGetReward() && t !== s) {
          i = true;
          break;
        }
      }
      if (this.qwn !== i) {
        this.GetButton(16)?.RootUIComp.SetUIActive(i);
        this.qwn = i;
      }
    }
  }
  H3i() {
    var t = this.kwn();
    if (t !== undefined) {
      this.GetButton(14)?.RootUIComp.SetUIActive(!t.GetIfUnlock() && t.GetClueId() > 0);
    }
  }
  Xwn() {
    var t = this.kwn();
    if (t === undefined) {
      this.GetText(6).SetText("");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "FragmentMemoryCollectTime", t.GetTimeText());
    }
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation = "ShowView01";
  }
}
exports.MemoryFragmentMainView = MemoryFragmentMainView;
class TabItemData {
  constructor() {
    this.FragmentCollectData = undefined;
    this.TabCallBack = () => {};
    this.GetCurrentSelectTabIndex = () => 0;
    this.NeedSwitchAnimation = false;
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.SPe = undefined;
    this.lkn = false;
    this.$wn = () => {
      this.Pe.TabCallBack(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.$wn]];
  }
  _kn() {
    if (this.SPe === undefined) {
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    }
    return this.SPe;
  }
  Refresh(t, e, i) {
    this.Pe = t;
    var r = this.GridIndex === t.GetCurrentSelectTabIndex();
    var s = r ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.FragmentCollectData.GetTitle());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.FragmentCollectData.GetTitle());
    this.GetItem(3)?.SetUIActive(t.FragmentCollectData.GetIfGetReward());
    this.BNe();
    this.Ywn();
    this.a9i();
    this.abn();
    if (this.lkn !== r) {
      this.ukn(s);
    }
    this.lkn = r;
  }
  ukn(t) {
    var e;
    var t = t === 1 ? "Select" : "Unselect";
    if (this.Pe?.NeedSwitchAnimation) {
      if ((e = this._kn()).GetCurrentSequence() === t) {
        e?.ReplaySequenceByKey(t);
      } else {
        e?.PlaySequencePurely(t);
      }
    } else {
      (e = this._kn())?.StopSequenceByKey("Select", false, false);
      e?.PlaySequencePurely(t);
      e.StopSequenceByKey(t, false, true);
    }
  }
  abn() {
    var t;
    if (this.Pe.FragmentCollectData.GetIfUnlock()) {
      t = (this.GridIndex + 1).toString().padStart(2, "0");
      this.GetText(1)?.SetText(t);
    } else {
      this.GetText(1)?.SetText("");
    }
  }
  Ywn() {
    var t = this.Pe.FragmentCollectData.GetIfUnlock();
    this.GetItem(5)?.SetUIActive(t);
  }
  a9i() {
    var t = !this.Pe.FragmentCollectData.GetIfUnlock();
    this.GetItem(6)?.SetUIActive(t);
  }
  BNe() {
    RedDotController_1.RedDotController.UnBindGivenUi("FragmentMemoryReward", this.GetItem(4), this.Pe.FragmentCollectData.GetId());
    RedDotController_1.RedDotController.BindRedDot("FragmentMemoryReward", this.GetItem(4), undefined, this.Pe.FragmentCollectData.GetId());
  }
}
class GridItemData {
  constructor() {
    this.Data = undefined;
    this.GetRewardState = false;
  }
}
class GridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Mne = 0;
  }
  OnRefresh(t, e, i) {
    this.Refresh(t);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Mne);
  }
  Refresh(t) {
    var e;
    var i;
    if (t?.Data) {
      i = t.Data[0];
      e = t.Data[1];
      this.Mne = i.ItemId;
      i = t.GetRewardState;
      t = {
        Data: t,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: e > 0 ? "" + e : "",
        IsReceivedVisible: i
      };
      this.Apply(t);
    }
  }
}
//# sourceMappingURL=MemoryFragmentMainView.js.map