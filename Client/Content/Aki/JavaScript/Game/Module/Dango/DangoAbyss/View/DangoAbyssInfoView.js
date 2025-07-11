"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssInfoView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const DangoAbyssBattleTreasureItem_1 = require("./DangoAbyssBattleTreasureItem");
class DangoAbyssInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.z2c = undefined;
    this.J2c = undefined;
    this.iYe = undefined;
    this.Z2c = undefined;
    this.qsi = undefined;
    this.SGe = undefined;
    this.GOe = undefined;
    this.Td1 = () => {
      this.kFc();
    };
    this.Vtl = () => {
      this.sSt();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate, this.Td1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate, this.Td1);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    var e = [];
    this.z2c = new SpriteTextItem();
    e.push(this.z2c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.J2c = new SpriteTextItem();
    e.push(this.J2c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.iYe = new SpriteTextItem();
    e.push(this.iYe.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Z2c = new SpriteTextItem();
    e.push(this.Z2c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.qsi = new RewardInfoItem();
    e.push(this.qsi.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.SGe = new DescItem();
    e.push(this.SGe.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    await Promise.all(e);
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.Vtl, 1000);
  }
  kFc() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.sqe(e);
  }
  OnBeforeShow() {
    this.BFc();
    this.VFc();
    this.sSt();
    this.kFc();
    this.Nft();
    this.Iwn();
  }
  BFc() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceReviveTipTips();
    this.J2c?.SetDesc(e);
  }
  VFc() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceFloorDetailProgressText();
    this.Z2c?.SetDesc(e);
  }
  sSt() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceRemainTimeText();
    this.iYe?.SetDesc(e);
  }
  Nft() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssName();
    if (e !== "") {
      this.z2c?.SetDesc(e);
    }
  }
  Iwn() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentRouteDesc();
    this.SGe?.SetDesc(e);
  }
  sqe(e) {
    this.qsi?.RefreshByProgress(e);
  }
  OnBeforeDestroy() {
    if (this.GOe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
}
exports.DangoAbyssInfoView = DangoAbyssInfoView;
class SpriteTextItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetDesc(e) {
    this.GetText(2)?.SetText(e);
  }
}
class RewardInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RewardTimeMap = new Map();
    this.FullTime = 0;
    this.UFc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UISliderComponent], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.FullTime = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore();
    this.RewardTimeMap = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap();
    this.UFc = new DangoAbyssBattleTreasureItem_1.DangoAbyssBattleTreasureRoot();
    await this.UFc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.UFc.InitItem(this.GetItem(3), this.GetItem(4));
    await this.UFc.Init(this.RewardTimeMap, this.FullTime);
  }
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetProgress(e) {
    this.GetSlider(2)?.SetValue(e);
  }
  RefreshByProgress(e) {
    this.SetProgress(e);
    this.sqe(e);
  }
  sqe(e) {
    this.UFc?.RefreshRewardItem(e * 100);
  }
}
class DescItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {}
  SetTitle(e) {
    this.GetText(1)?.SetText(e);
  }
  SetDesc(e) {
    this.GetText(3)?.SetText(e);
  }
}
//# sourceMappingURL=DangoAbyssInfoView.js.map