"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastActivityTaskView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const MediaPlayer_1 = require("../../../Common/MediaPlayer");
const PageDot_1 = require("../../../Common/PageDot");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BlackCoastTaskItem_1 = require("./BlackCoastTaskItem");
class BlackCoastActivityTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.lqe = undefined;
    this.tPe = undefined;
    this.OOe = undefined;
    this.Xja = [];
    this.Yja = 0;
    this.wNo = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.HOe = () => new PageDot_1.PageDot();
    this.VOe = () => new BlackCoastTaskItem_1.BlackCoastTaskItem();
    this.zja = i => {
      if (this.ActivityBaseData && this.ActivityBaseData.Id === i) {
        i = this.ActivityBaseData.GetStageById(this.Xja[this.Yja]);
        this.uXa();
        this._Xa(i.GetTaskList(), false);
      }
    };
    this.KOe = () => {
      this.Og(this.Yja - 1);
    };
    this.QOe = () => {
      var i = this.Yja + 1;
      var t = this.ActivityBaseData.GetStageById(this.Xja[i]);
      if (t.IsUnlock) {
        this.Og(i);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t.GetLockConditionText());
      }
    };
    this.$Oe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [4, UE.UIVerticalLayout], [5, UE.UIItem], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIText], [11, UE.UITexture]];
    this.BtnBindInfo = [[6, this.KOe], [7, this.QOe]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.$Oe);
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.HOe);
    this.OOe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.VOe);
    if (Info_1.Info.PlatformType === 2) {
      await this.pah();
    }
    this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(9));
    var [i, t] = this.OpenParam;
    if (i && t) {
      this.ActivityBaseData = i;
      this.lqe.SetTitle(this.ActivityBaseData.GetTitle());
      this.Xja = this.ActivityBaseData.GetAllStagesId();
      this.Yja = this.Xja.includes(t) ? this.Xja.indexOf(t) : 0;
      await this.tPe.RefreshByDataAsync(this.Xja);
      await this.SHe(this.Yja);
    }
  }
  async pah() {
    const t = new CustomPromise_1.CustomPromise();
    this.X3i();
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("M_VideoTexture");
    this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.MaterialInterface, i => {
      this.GetTexture(9).SetCustomUIMaterial(i);
      t.SetResult();
    }, 102);
    await t.Promise;
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(undefined, this.ActivityBaseData.Id);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
  }
  OnBeforeDestroy() {
    this.wNo?.Clear();
    this.wNo = undefined;
    this.X3i();
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  async SHe(i) {
    this.Yja = i;
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(true);
    var i = this.Xja[this.Yja];
    var t = this.ActivityBaseData.GetStageById(i);
    var e = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(t.StageId);
    var s = this.GetTexture(11);
    this.GetButton(6).RootUIComp.SetUIActive(this.Yja > 0);
    this.GetButton(7).RootUIComp.SetUIActive(this.Yja < this.Xja.length - 1);
    this.ActivityBaseData.SaveNewStageFlag(i);
    this._Xa(t.GetTaskList(), true);
    await this.wNo.LoadVideoAndPlay(t.StageId.toString(), t.GetVideoSource(), true);
    this.SetTextureShowUntilLoaded(e.TextureSmall, s);
    this.uXa();
  }
  async Og(i) {
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(false);
    this.Yja = i;
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(true);
    var i = this.Xja[this.Yja];
    var t = this.ActivityBaseData.GetStageById(i);
    var e = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(t.StageId);
    var s = this.GetTexture(11);
    this.GetButton(6).RootUIComp.SetUIActive(this.Yja > 0);
    this.GetButton(7).RootUIComp.SetUIActive(this.Yja < this.Xja.length - 1);
    this.ActivityBaseData.SaveNewStageFlag(i);
    this._Xa(t.GetTaskList(), true);
    this.WNe();
    await this.PlaySequenceAsync("SwitchOut", true);
    this.SetTextureShowUntilLoaded(e.TextureSmall, s);
    this.uXa();
    await this.PlaySequenceAsync("SwitchIn", true);
  }
  uXa() {
    var i = this.ActivityBaseData.GetStageById(this.Xja[this.Yja]);
    var t = ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(i.StageId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "BlackCoastTheme_TaskCompleteProgress", i.GetTaskProgress());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.TitleDetail);
  }
  _Xa(i, t) {
    this.OOe.RefreshByData(i, undefined, t);
  }
  WNe() {
    var i = this.ActivityBaseData.GetStageById(this.Xja[this.Yja]);
    this.wNo.PlayVideo(i.StageId.toString(), i.GetVideoSource(), true);
  }
}
exports.BlackCoastActivityTaskView = BlackCoastActivityTaskView;
//# sourceMappingURL=BlackCoastActivityTaskView.js.map