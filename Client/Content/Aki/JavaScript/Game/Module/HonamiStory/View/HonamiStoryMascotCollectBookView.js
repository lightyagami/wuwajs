"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMascotCollectBookView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryBozaiTalkPanel_1 = require("./Items/HonamiStoryBozaiTalkPanel");
const MascotCollectBookMascotPanel_1 = require("./Items/MascotCollectBookMascotPanel");
const MascotCollectBookStagePanel_1 = require("./Items/MascotCollectBookStagePanel");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class HonamiStoryMascotCollectBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.CNe = undefined;
    this.tJl = 0;
    this.QVd = undefined;
    this.KVd = undefined;
    this.XVd = undefined;
    this.YVd = undefined;
    this.S_m = undefined;
    this.zVd = t => {
      if (this.tJl !== t) {
        this.tJl = t;
        this.aLn();
        this.Og();
        this.UiViewSequence?.PlaySequence("Desc_Switch");
      }
    };
    this.Tzd = () => {
      this.QVd.SetRedDotVisible(this.CNe.CanMascotCollectGetReward());
      this.KVd.SetRedDotVisible(this.CNe.CanAreaCollectGetReward());
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(8);
      this.S_m.SetTalkInfoTextAndPlayAudio(t);
    };
    this.bzd = t => {
      this.KVd.SetRedDotVisible(this.CNe.CanAreaCollectGetReward());
    };
    this.Dmm = () => {
      this.UiViewSequence?.PlaySequence("Paper_Fall");
    };
    this.V2i = () => {
      this.Umm();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.CNe = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.V2i);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_WANTED);
    });
    var t = [];
    this.QVd = new MascotCollectBookToggleItem();
    t.push(this.QVd.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.QVd.SetSelectType(0);
    this.QVd.BindToggleCallBack(this.zVd);
    this.KVd = new MascotCollectBookToggleItem();
    t.push(this.KVd.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.KVd.SetSelectType(1);
    this.KVd.BindToggleCallBack(this.zVd);
    this.XVd = new MascotCollectBookMascotPanel_1.MascotCollectBookMascotPanel();
    this.XVd.BindSwitchCallback(this.Dmm);
    t.push(this.XVd.CreateByResourceIdAsync("UiItem_CollectBookVermisstInfo", this.GetItem(3)));
    this.YVd = new MascotCollectBookStagePanel_1.MascotCollectBookStagePanel();
    this.YVd.BindSwitchCallback(this.Dmm);
    t.push(this.YVd.CreateByResourceIdAsync("UiItem_CollectBookStadtage", this.GetItem(3)));
    this.S_m = new HonamiStoryBozaiTalkPanel_1.HonamiStoryBozaiTalkPanel();
    t.push(this.S_m.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(t);
  }
  OnBeforeShow() {
    this.tJl = 0;
    this.aLn();
    this.Og();
    this.QVd.SetRedDotVisible(this.CNe.CanMascotCollectGetReward());
    this.KVd.SetRedDotVisible(this.CNe.CanAreaCollectGetReward());
    let t = 6;
    if (this.CNe.CheckMascotCollectFinished()) {
      t = 7;
    }
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(t);
    this.S_m.SetTalkInfoTextAndPlayAudio(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryMascotRewardReceive, this.Tzd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryAreaSecretRewardReceive, this.bzd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryMascotRewardReceive, this.Tzd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryAreaSecretRewardReceive, this.bzd);
  }
  Og() {
    if (this.tJl === 0) {
      this.XVd.InitPanel();
    }
    if (this.tJl === 1) {
      this.YVd.InitPanel();
    }
    this.XVd.SetActive(this.tJl === 0);
    this.YVd.SetActive(this.tJl === 1);
  }
  aLn() {
    this.QVd.RefreshToggleItem(this.tJl);
    this.KVd.RefreshToggleItem(this.tJl);
  }
  Umm() {
    if (this.tJl === 0) {
      this.XVd.CloseWithSequence();
    }
    if (this.tJl === 1) {
      this.YVd.CloseWithSequence();
    }
  }
}
exports.HonamiStoryMascotCollectBookView = HonamiStoryMascotCollectBookView;
class MascotCollectBookToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tJl = 0;
    this.pqe = undefined;
    this.Cke = () => {
      this.pqe?.(this.tJl);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
  }
  SetSelectType(t) {
    this.tJl = t;
    this.RefreshToggleItem(this.tJl);
  }
  BindToggleCallBack(t) {
    this.pqe = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  RefreshToggleItem(t) {
    if (t === this.tJl) {
      this.fPi();
    } else {
      this.JVd();
    }
  }
  fPi() {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  JVd() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
//# sourceMappingURL=HonamiStoryMascotCollectBookView.js.map