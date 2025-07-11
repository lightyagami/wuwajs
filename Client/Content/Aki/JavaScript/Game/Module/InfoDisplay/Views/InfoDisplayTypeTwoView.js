"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayTypeTwoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const CircleAttachView_1 = require("../../AutoAttach/CircleAttachView");
const NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView");
const InfoDisplayController_1 = require("../InfoDisplayController");
const InfoDisplayCircleAttachItem_1 = require("./InfoDisplayCircleAttachItem");
const InfoDisplayNoCircleAttachItem_1 = require("./InfoDisplayNoCircleAttachItem");
const PICTURE_DISTANCE = -850;
class InfoDisplayTypeTwoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.dai = 0;
    this.Iye = undefined;
    this.ovt = undefined;
    this.jbe = e => {
      this.Cai(e);
    };
    this.gai = 3;
    this.Uye = (e, t, i) => {
      return new InfoDisplayCircleAttachItem_1.InfoDisplayCircleAttachItem(e);
    };
    this.fai = (e, t, i) => {
      return new InfoDisplayNoCircleAttachItem_1.InfoDisplayNoCircleAttachItem(e);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.Pwe = () => {
      this.pai(1);
    };
    this.wwe = () => {
      this.pai(-1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[7, this.Jvt], [3, this.Pwe], [4, this.wwe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClickDisplayItem, this.jbe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClickDisplayItem, this.jbe);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.SHe(e);
    this.vai(e);
    this.Hxt(e);
  }
  SHe(e) {
    this.Iye?.Clear();
    this.ovt?.Clear();
    this.Iye = undefined;
    this.ovt = undefined;
    var e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(e);
    var t = this.GetItem(1);
    (e.length < this.gai ? (this.ovt = new NoCircleAttachView_1.NoCircleAttachView(t.GetOwner()), this.ovt.CreateItems(this.GetItem(0).GetOwner(), PICTURE_DISTANCE, this.fai), this.ovt.DisableDragEvent(), this.ovt) : (this.Iye = new CircleAttachView_1.CircleAttachView(t.GetOwner()), this.Iye.CreateItems(this.GetItem(0).GetOwner(), PICTURE_DISTANCE, this.Uye), this.Iye.DisableDragEvent(), this.Iye)).ReloadView(e.length, e);
    this.dai = e.length;
    this.GetItem(0).SetUIActive(false);
    this.Mai();
  }
  vai(e) {
    e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(e).length > 1;
    this.GetItem(8).SetUIActive(e);
    this.GetItem(9).SetUIActive(e);
  }
  Hxt(e) {
    this.l7e(e);
    this.Mai();
  }
  l7e(e) {
    var t = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(e);
    this.GetText(6).SetText(t);
    var t = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(e);
    this.GetText(5).SetText(t);
  }
  pai(e) {
    if (this.ovt !== undefined) {
      this.ovt.AttachToNextItem(e);
    } else if (this.Iye !== undefined) {
      this.Iye.AttachToNextItem(e);
    }
  }
  Cai(e) {
    if (this.ovt !== undefined) {
      this.ovt?.ScrollToItem(e);
    } else if (this.Iye !== undefined) {
      this.Iye?.ScrollToItem(e);
    }
    this.Mai();
  }
  Mai() {
    let e = 0;
    if (this.ovt !== undefined) {
      e = this.ovt.GetCurrentSelectIndex();
    } else if (this.Iye !== undefined) {
      e = this.Iye.GetCurrentSelectIndex();
    }
    var t = e + 1 + "/" + this.dai;
    this.GetText(2).SetText(t);
  }
  OnBeforeDestroy() {
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
    this.Iye?.Clear();
    this.ovt?.Clear();
  }
  async OnBeforeHideAsync() {
    if (this.OpenParam?.FadeBeforeHide) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3);
    }
  }
}
exports.InfoDisplayTypeTwoView = InfoDisplayTypeTwoView;
//# sourceMappingURL=InfoDisplayTypeTwoView.js.map