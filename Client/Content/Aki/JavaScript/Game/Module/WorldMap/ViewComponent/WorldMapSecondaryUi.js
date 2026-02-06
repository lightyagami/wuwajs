"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSecondaryUi = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupTypeRightItem_1 = require("../../../Ui/Common/PopupTypeRightItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MapHelper_1 = require("../../Map/MapHelper");
class WorldMapSecondaryUi extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiBgItem = undefined;
    this.a3o = undefined;
    this.jHa = 0;
    this.Map = undefined;
    this.h3o = undefined;
    this.K3t = e => {
      if (e === "Close") {
        this.Gh_();
      }
    };
    this.Close = (e, t = true) => {
      this.h3o = e;
      this.jHa = 1;
      if (t) {
        this.SPe.PlayLevelSequenceByName("Close");
      } else {
        this.Gh_();
      }
    };
  }
  get IsUiOpen() {
    return this.jHa === 0;
  }
  get IsUiCloseComplete() {
    return this.jHa === 2;
  }
  get IsUiClose() {
    return this.jHa === 1;
  }
  get SPe() {
    var e;
    if (!this.a3o) {
      e = this.UiBgItem?.GetRootItem() ?? this.GetRootItem();
      this.a3o = new LevelSequencePlayer_1.LevelSequencePlayer(e);
      this.a3o.BindSequenceCloseEvent(this.K3t);
    }
    return this.a3o;
  }
  OnBeforeCreate() {
    if (this.GetNeedBgItem()) {
      this.UiBgItem = this.GetPopupRightItem();
    }
  }
  GetPopupRightItem() {
    return new PopupTypeRightItem_1.PopupTypeRightItem();
  }
  OnBeforeDestroyImplementImplement() {}
  OnBeforeDestroyImplement() {
    this.OnBeforeDestroyImplementImplement();
    this.a3o?.Clear();
    this.a3o = undefined;
  }
  async OnBeforeStartAsync() {
    var e;
    if (this.UiBgItem) {
      await this.UiBgItem.CreateByResourceIdAsync("UiView_PopupR", this.ParentUiItem, this.UsePool);
      e = this.GetOriginalActor().GetComponentByClass(UE.UIItem.StaticClass());
      this.UiBgItem.AttachItem(e, this.GetRootItem());
      this.UiBgItem.SetPopupViewBase();
      this.UiBgItem.OverrideBackBtnCallBack(this.Close);
      this.AddChild(this.UiBgItem);
    }
  }
  Gh_(e = false) {
    this.SetActive(false);
    this.m2e(e);
  }
  m2e(e = false) {
    this.OnCloseWorldMapSecondaryUi();
    this.jHa = 2;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSecondaryUiClosed, e);
    if (this.h3o) {
      this.h3o();
    }
  }
  OnBeforeHide() {
    if (this.SPe.IsPlayingSequence("Close")) {
      this.SPe.StopCurrentSequence();
      this.m2e();
    }
  }
  MarkForOpen() {
    this.jHa = 0;
  }
  async ShowPanel(e, ...t) {
    if (this.IsUiOpen) {
      this.Map = e;
      this.SetupWorldMapSecondaryUiLayout();
      await this.OnBeforeShowWorldMapSecondaryUiAsync(...t);
      if (this.IsUiOpen) {
        this.RootItem.SetAlpha(1);
        this.SetActive(true);
        this.OnShowWorldMapSecondaryUi(...t);
        this.SPe.PlayLevelSequenceByName("Start");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSecondaryUiOpened);
      } else {
        this.Gh_(true);
      }
    }
  }
  OnAfterShow() {
    this.OnAfterShowWorldMapSecondaryUi();
  }
  UpdateMap(e) {
    this.Map = e;
  }
  async OnBeforeShowWorldMapSecondaryUiAsync() {}
  SetupWorldMapSecondaryUiLayout() {}
  OnShowWorldMapSecondaryUi() {}
  OnCloseWorldMapSecondaryUi() {}
  GetResourceId() {
    return "";
  }
  GetGuideFocusUiItem() {}
  GetNeedBgItem() {
    return true;
  }
  CheckAndShowCrossMapTips(e) {
    if (!e.IsTracked) {
      MapHelper_1.MapHelper.CheckAndShowCrossMapTips(e.MarkId, e.MarkType, e.TrackAreaId, e.WorldPosition);
    }
  }
  OnAfterShowWorldMapSecondaryUi() {}
}
exports.WorldMapSecondaryUi = WorldMapSecondaryUi;
//# sourceMappingURL=WorldMapSecondaryUi.js.map