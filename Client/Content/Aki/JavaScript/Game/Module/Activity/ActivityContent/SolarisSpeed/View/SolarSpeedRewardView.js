"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class SolarSpeedRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.qsi = undefined;
    this.CY_ = undefined;
    this.pY_ = undefined;
    this.dkl = () => {
      this.CloseMe();
    };
    this.B3_ = e => {
      e = ModelManager_1.ModelManager.SolarSpeedModel.BuildSolarSpeedRewardViewDataById(e);
      this.OpenParam = e;
      this.qsi.OpenParam = e.RewardPanelData;
      this.qsi.RefreshByOpenParam();
      this.pY_.LiteStop();
      this.pY_.LitePlayAsync("Switch");
    };
    this.O6_ = () => {
      var e = ModelManager_1.ModelManager.SolarSpeedModel;
      if (e.CurrentChosenTabInRewardView !== undefined) {
        this.OpenParam = e.BuildSolarSpeedRewardViewDataById(e.CurrentChosenTabInRewardView);
        this.skl();
      }
    };
    this.eFl = e => {
      this.qsi.PlayStart(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.qsi = new SolarSpeedRewardPanel();
    await this.qsi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner(), e.RewardPanelData);
    this.CY_ = new UiSequencePlayer_1.UiSequencePlayer(this.lqe.GetRootItem());
    this.pY_ = new UiSequencePlayer_1.UiSequencePlayer(this.qsi.GetRootItem());
  }
  OnStart() {
    var e = this.OpenParam;
    this.lqe.SetTitleByTextIdAndArgNew(e.TitleTextId);
    this.lqe.SetTitleIcon(e.TitleIconPath);
    this.lqe.SetCloseCallBack(this.dkl);
    this.GetText(2)?.SetUIActive(false);
    this.skl();
    this.CY_.LitePlayAsync("Start");
    this.pY_.LitePlayAsync("Start");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SolarSpeedClickRewardTab, this.B3_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SolarSpeedClickRewardTab, this.B3_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SolarSpeedRewarded, this.O6_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.eFl);
  }
  OnBeforeShow() {
    this.CY_.LitePlayAsync("Start");
    this.pY_.LitePlayAsync("Start");
  }
  async OnBeforeHideAsync() {
    await this.pY_.LitePlayAsync("Close");
  }
  skl() {
    var e = this.OpenParam;
    this.qsi.OpenParam = e.RewardPanelData;
    this.qsi.RefreshByOpenParam();
  }
}
exports.SolarSpeedRewardView = SolarSpeedRewardView;
class SolarSpeedRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.B7t = undefined;
    this.H3e = undefined;
    this.k3_ = () => new SolarSpeedTabCellPanel();
    this.q3_ = () => new SolarSpeedRewardCellPanel();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.B7t = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.k3_);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.q3_);
    return Promise.resolve();
  }
  OnStart() {
    this.RefreshByOpenParam();
  }
  RefreshByOpenParam() {
    var e = this.OpenParam;
    this.B7t.RefreshByData(e.TabDataList);
    this.H3e.RefreshByData(e.RewardDataList);
  }
  PlayStart(e) {
    this.GetVerticalLayout(2).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass()).Play(e);
  }
}
class SolarSpeedTabCellPanel extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.O3_ = () => {
      var e = this.OpenParam;
      ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.SyncCurrentChosenLevelId(e.LevelId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SolarSpeedClickRewardTab, e.LevelId);
    };
    this.$$a = () => {
      return !this.OpenParam.IsChosen;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.O3_]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.$$a);
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0)?.CanExecuteChange.Unbind();
  }
  Refresh(e, t, i) {
    this.OpenParam = e;
    this.skl(e);
  }
  skl(e) {
    var t = this.GetExtendToggle(0);
    if (t !== undefined) {
      t.SetToggleStateForce(e.IsChosen ? 1 : 0);
    }
    this.TrySetTextureByPath(e.RomeNumberPath, this.GetTexture(2));
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e.TitleTextId);
    this.GetItem(3)?.SetUIActive(e.IsRedDot);
  }
}
class SolarSpeedRewardCellPanel extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vQa = undefined;
    this.p4e = undefined;
    this.G3_ = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.A3_ = () => {
      var e = this.OpenParam;
      ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController.RequestTeamParkourRewardRequest(e.RewardId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.vQa = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.G3_);
    this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(4));
    return Promise.resolve();
  }
  Refresh(e, t, i) {
    this.OpenParam = e;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), e.TitleTextId);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e.ProgressTextId, ...e.ProgressTextArgs);
    this.p4e?.SetUiActive(e.ButtonActive);
    if (e.ButtonActive) {
      this.p4e?.SetFunction(this.A3_);
      this.p4e?.SetLocalTextNew(e.ButtonTextId);
    }
    this.GetText(5)?.SetUIActive(e.RightActive);
    this.GetSprite(6)?.SetUIActive(e.DoneSpriteActive);
    this.vQa?.RefreshByData(e.ItemsData);
  }
}
//# sourceMappingURL=SolarSpeedRewardView.js.map