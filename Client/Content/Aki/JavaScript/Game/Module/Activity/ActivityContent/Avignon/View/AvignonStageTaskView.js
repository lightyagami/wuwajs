"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonStageTaskView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const PageDot_1 = require("../../../../Common/PageDot");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const AvignonTaskItem_1 = require("./Item/AvignonTaskItem");
class AvignonStageTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xOe = 0;
    this.GSc = undefined;
    this.Yja = 0;
    this.Xja = [];
    this.lqe = undefined;
    this.tPe = undefined;
    this.qoh = undefined;
    this.JSc = 0;
    this.HOe = () => new PageDot_1.PageDot();
    this.VOe = () => new AvignonTaskItem_1.AvignonTaskItem();
    this.zja = i => {
      if (ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityId() === i) {
        i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.Xja[this.Yja]);
        this._Xa(i.GetTaskList(), false);
      }
    };
    this.KOe = () => {
      this.JSc = this.Yja - 1;
      this.PlaySequence("SwitchLeft");
    };
    this.QOe = () => {
      var i = this.Yja + 1;
      var t = this.Xja[i];
      var t = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(t);
      if (t.IsUnlock) {
        this.JSc = i;
        this.PlaySequence("SwitchRight");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t.GetLockConditionText());
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.$An = i => {
      if (i === "PageChange") {
        this.Og();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UISprite], [10, UE.UIText]];
    this.BtnBindInfo = [[7, this.KOe], [6, this.QOe]];
  }
  async OnBeforeStartAsync() {
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.HOe);
    this.qoh = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.VOe);
    this.xOe = this.OpenParam;
    this.Xja = ModelManager_1.ModelManager.AvignonModel.GetAvignonAllStagesId();
    this.Yja = this.Xja.includes(this.xOe) ? this.Xja.indexOf(this.xOe) : 0;
    await this.tPe.RefreshByDataAsync(this.Xja);
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
    await this.qoh.RefreshByDataAsync(i.GetTaskList());
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityName();
    this.lqe.SetTitle(i);
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this.AMo);
    this.JSc = this.Yja;
    this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zja);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  Og() {
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(false);
    this.Yja = this.JSc;
    this.tPe.GetLayoutItemByIndex(this.Yja).UpdateShow(true);
    this.GetButton(7).RootUIComp.SetUIActive(this.Yja > 0);
    this.GetButton(6).RootUIComp.SetUIActive(this.Yja < this.Xja.length - 1);
    this.xOe = this.Xja[this.Yja];
    this.GSc = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(this.xOe);
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
    this._Xa(i.GetTaskList(), true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), this.GSc.Title);
    let t = this.GSc.Icon;
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) {
      t = this.GSc.FemaleIcon;
    }
    this.SetTextureByPath(t, this.GetTexture(8));
    this.SetSpriteByPath(this.GSc.RomaIcon, this.GetSprite(9), false);
    ModelManager_1.ModelManager.AvignonModel.SaveNewStageFlag(this.xOe);
  }
  _Xa(i, t) {
    this.FSc();
    this.qoh.RefreshByData(i, undefined, t);
  }
  FSc() {
    var i = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BlackCoastTheme_TaskCompleteProgress", i.GetTaskProgress());
  }
}
exports.AvignonStageTaskView = AvignonStageTaskView;
//# sourceMappingURL=AvignonStageTaskView.js.map