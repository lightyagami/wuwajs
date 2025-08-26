"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonSearchComponent_1 = require("../Common/InputView/CommonSearchComponent");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const TutorialDataItem_1 = require("./SubView/TutorialDataItem");
const TutorialDynItem_1 = require("./SubView/TutorialDynItem");
const TutorialPageItem_1 = require("./SubView/TutorialPageItem");
const TutorialController_1 = require("./TutorialController");
const TutorialDefine_1 = require("./TutorialDefine");
class TutorialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.IsOpenedByGuide = false;
    this.Ivt = undefined;
    this.JPt = undefined;
    this.tPe = undefined;
    this.dqe = undefined;
    this.GRo = undefined;
    this.NRo = undefined;
    this.s8e = [];
    this.ORo = 0;
    this.fGt = undefined;
    this.kRo = undefined;
    this.T_u = 0;
    this.Mbe = t => {
      var t = ModelManager_1.ModelManager.TutorialModel.MakeSearchList(t, this.GRo);
      var i = t.ItemData;
      this.GetItem(5).SetUIActive(!i.length);
      if (!i.length) {
        this.FRo();
      }
      if (!t.HasTutorial && this.GRo !== TutorialDefine_1.ETutorialType.All) {
        this.FRo();
      }
      this.JPt.RefreshByData(i);
    };
    this.Tqe = () => {
      this.VRo(this.GRo);
      this.GetItem(4).SetUIActive(true);
    };
    this.hPe = (t, i, e) => {
      var s = undefined;
      (s = new TutorialPageItem_1.TutorialPageItem(i)).Init();
      s.UpdateShow(false);
      return {
        Key: e,
        Value: s
      };
    };
    this.R6e = (t, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.VRo = t => {
      t = this.s8e[t];
      this.GRo = t;
      this.dqe.ResetSearch(true);
      t = ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(t, this.T_u);
      let i = -1;
      if (this.hRl > -1) {
        i = t.findIndex(t => t.SavedData?.TutorialId === this.hRl);
        if ((this.hRl = -1) < i) {
          t[i].Selected = true;
        } else {
          t[0].Selected = true;
        }
      } else if (t.length > 0) {
        t[0].Selected = true;
      }
      this.JPt.RefreshByData(t);
      if (t.length) {
        if (i > -1) {
          TimerSystem_1.GameplayTimerSystem.Next(() => {
            this.JPt?.ScrollToItemIndex(i);
          });
        }
      } else {
        this.FRo();
      }
      this.GetItem(5).SetUIActive(!t.length);
      this.dqe.SetActive(!!t.length);
      this.UiViewSequence.PlaySequence("Switch");
      this.GetUIDynScrollViewComponent(2).RootUIComp.SetUIActive(!!t.length);
    };
    this.yqe = t => {
      var i = this.s8e[t];
      var i = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(i);
      var t = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(this.s8e[t]);
      return new CommonTabData_1.CommonTabData(i, new CommonTabTitleData_1.CommonTabTitleData(t));
    };
    this.hRl = -1;
    this._Rl = () => {
      var t;
      var i;
      if (this.OpenParam && (t = this.OpenParam.TutorialId ?? 0, (i = ModelManager_1.ModelManager.TutorialModel?.GetSavedDataById(t))?.TutorialData)) {
        i = i.TutorialData.TutorialType;
        this.hRl = t;
        this.Ivt.SelectToggleByIndex(i);
        this.hRl = -1;
      } else {
        this.Ivt.SelectToggleByIndex(0);
      }
    };
    this.HRo = (t, i, e) => {
      var s = new TutorialDataItem_1.TutorialDataItem();
      s.InitData(t);
      s.SetOnToggleSelected(this.jRo);
      return s;
    };
    this.HUn = () => {
      var t;
      var i;
      var e = ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(this.GRo, this.T_u);
      for ([t, i] of e.entries()) {
        i.Selected = t === 0;
      }
      this.JPt.RefreshByData(e);
    };
    this.WRo = () => {
      for (const t of this.JPt.GetScrollItemItems()) {
        t.RefreshRed();
      }
    };
    this.jRo = (t, i) => {
      if (this.NRo !== i) {
        this.NRo?.SetToggleState(0, false);
        this.NRo = i;
      }
      this.GetItem(5).SetUIActive(false);
      this.FTt(t);
    };
    this.KRo = () => {
      if (this.ORo > 0) {
        this.UiViewSequence.PlaySequence("SwitchLeft");
        this.QRo(this.ORo - 1);
      }
    };
    this.XRo = () => {
      if (this.ORo < this.kRo.length - 1) {
        this.UiViewSequence.PlaySequence("SwitchRight");
        this.QRo(this.ORo + 1);
      }
    };
    this.lPe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIDynScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIHorizontalLayout], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[14, this.KRo], [15, this.XRo]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotNewTutorial, this.WRo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTutorialUpdate, this.HUn);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotNewTutorial, this.WRo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTutorialUpdate, this.HUn);
  }
  async OnBeforeStartAsync() {
    this.JPt = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(2), this.GetItem(3), new TutorialDynItem_1.TutorialDynItem(), this.HRo);
    await this.JPt.Init();
  }
  OnStart() {
    var t = this.OpenParam;
    this.T_u = t?.ExclusiveType ?? 0;
    ModelManager_1.ModelManager.TutorialModel.CurrentExclusiveType = this.T_u;
    this.GetItem(3).SetUIActive(false);
    for (const e in TutorialDefine_1.ETutorialType) {
      var i = Number(e);
      if (!isNaN(i)) {
        this.s8e.push(i);
      }
    }
    if (this.T_u !== 0) {
      this.s8e.length = 0;
      this.s8e.push(TutorialDefine_1.ETutorialType.All);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewTutorialType, TutorialDefine_1.ETutorialType.All);
    }
    this.dqe = new CommonSearchComponent_1.CommonSearchComponent(this.GetItem(1), this.Mbe, this.Tqe);
    t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.VRo, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.lPe);
    this.tPe = new GenericLayoutNew_1.GenericLayoutNew(this.GetHorizontalLayout(12), this.hPe, this.GetItem(13));
    this.FRo();
  }
  async RefreshItemDetailWhenNeed(t) {
    await TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME);
    if (t > -1) {
      await this.JPt?.ScrollToItemIndex(t);
    }
    this.JPt?.GetScrollItemFromIndex(t > -1 ? t : 0).OnSelected(true);
  }
  FRo() {
    this.GetItem(4).SetUIActive(false);
    this.fGt = undefined;
  }
  OnBeforeShow() {
    var i = this.s8e.length;
    var e = this.Ivt.CreateTabItemDataByLength(i);
    for (let t = 0; t < i; t++) {
      var s = this.s8e[t];
      if (s === TutorialDefine_1.ETutorialType.All) {
        e[t].RedDotName = "TutorialTypeNew";
        e[t].RedDotUid = s;
      }
    }
    this.Ivt.RefreshTabItem(e, this._Rl);
  }
  OnAfterHide() {
    this.JPt.ClearChildren();
    this.FRo();
    this.NRo = undefined;
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    if (this.tPe) {
      this.tPe.ClearChildren();
      this.tPe = undefined;
    }
    this.dqe?.Destroy();
    this.JPt?.ClearChildren();
    this.JPt = undefined;
    this.s8e = [];
    if (this.IsOpenedByGuide) {
      ModelManager_1.ModelManager.GuideModel?.ClipTipState();
      ModelManager_1.ModelManager.GuideModel?.RemoveCurrentTutorialInfo();
      ModelManager_1.ModelManager.GuideModel?.TryShowTutorial();
      this.IsOpenedByGuide = false;
    }
    TutorialController_1.TutorialController.TryOpenAwardUiViewPending();
    ModelManager_1.ModelManager.TutorialModel.CurrentExclusiveType = 0;
  }
  FTt(t) {
    this.GetItem(4).SetUIActive(true);
    if (this.fGt !== t) {
      this.UiViewSequence.PlaySequence("SwitchPage");
    }
    if (this.fGt) {
      this.fGt.Selected = false;
    }
    this.fGt = t;
    this.fGt.Selected = true;
    this.ORo = 0;
    if (this.fGt.SavedData.HasRedDot) {
      TutorialController_1.TutorialController.RemoveRedDotTutorialId(this.fGt.SavedData.TutorialId);
    }
    t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(this.fGt.SavedData.TutorialId);
    if ((this.kRo = t).length <= 1) {
      this.GetButton(14).RootUIComp.SetUIActive(false);
      this.GetButton(15).RootUIComp.SetUIActive(false);
      this.GetItem(11).SetUIActive(false);
    } else {
      this.GetButton(14).RootUIComp.SetUIActive(true);
      this.GetButton(15).RootUIComp.SetUIActive(true);
      this.GetItem(11).SetUIActive(true);
      this.tPe.RebuildLayoutByDataNew(this.kRo);
    }
    this.QRo(this.ORo);
  }
  QRo(t) {
    if (this.kRo.length > 1) {
      this.tPe.GetLayoutItemByIndex(this.ORo).UpdateShow(false);
      this.tPe.GetLayoutItemByIndex(t).UpdateShow(true);
    }
    this.ORo = t;
    var i;
    var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(this.kRo[t]);
    if (t.Pic) {
      i = this.GetTexture(6);
      this.SetTextureByPath(t.Pic, i);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Title);
    if (StringUtils_1.StringUtils.IsEmpty(t.SubTitle)) {
      this.GetItem(8).SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SubTitle);
      this.GetItem(8).SetUIActive(true);
    }
    if (this.kRo.length > 1) {
      this.GetButton(14).SetSelfInteractive(this.ORo > 0);
      this.GetButton(15).SetSelfInteractive(this.ORo < this.kRo.length - 1);
    }
    let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content);
    e = e.split("/n").join("");
    this.GetText(10).SetText(e);
  }
}
exports.TutorialView = TutorialView;
//# sourceMappingURL=TutorialView.js.map