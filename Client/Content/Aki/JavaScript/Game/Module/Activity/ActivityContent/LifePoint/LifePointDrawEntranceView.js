"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointDrawItem = exports.LifePointDrawEntranceView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LifePointDrawViewModel_1 = require("./LifePointDrawViewModel");
class LifePointDrawEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.sPu = undefined;
    this.aPu = [];
    this.lqe = undefined;
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.sPu = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Activity_105600001_Title") ?? "");
    this.lqe.SetHelpBtnActive(true);
    this.lqe.SetCloseCallBack(this.AMo);
    var i = [];
    let t = 0;
    for (let e = 2; e <= 8; e++) {
      var r = new LifePointDrawItem();
      r.SetIndex(t);
      var s = this.GetItem(e);
      i.push(r.CreateThenShowByResourceIdAsync("UiItem_ColorLevelItem", s));
      t++;
      this.aPu.push(r);
    }
    await Promise.all(i);
  }
  OnBeforeShow() {
    this.RefreshView();
    this.sGu();
  }
  RefreshView() {
    var i = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointEntranceById(this.sPu.Id).GroupList;
    var t = i.length;
    var r = this.aPu.length;
    for (let e = 0; e < r; e++) {
      if (e < t) {
        this.aPu[e].RefreshView(i[e], this.sPu);
        this.aPu[e].SetUiActive(true);
        this.aPu[e].PlaySequence("Start");
      } else {
        this.aPu[e].SetUiActive(false);
      }
    }
    this.Qbe();
  }
  sGu() {
    var i = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointEntranceById(this.sPu.Id).GroupList;
    var t = i.length;
    let r = 0;
    for (let e = 0; e < t; e++) {
      if (!ModelManager_1.ModelManager.LifePointDrawModel.GetGroupRewardState(this.sPu.Id, i[e])) {
        r = e;
        break;
      }
    }
    const e = this.GetScrollViewWithScrollbar(1);
    const s = r / t;
    if (!(s < 0)) {
      e.OnLateUpdate.Bind(() => {
        e.SetScrollProgress(1 - s);
        e.OnLateUpdate.Unbind();
      });
    }
  }
  Qbe() {
    var e = ModelManager_1.ModelManager.LifePointDrawModel.GetProgressByActivityId(this.sPu.Id, "Colorful_Finish_Progress");
    this.GetText(9)?.SetText(e);
  }
}
exports.LifePointDrawEntranceView = LifePointDrawEntranceView;
class LifePointDrawItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.hPu = false;
    this._Dt = 0;
    this.sPu = undefined;
    this.YP = () => {
      var e = new LifePointDrawViewModel_1.LifePointDrawDetailViewModel();
      e.GroupId = this._Dt;
      e.LifePointDrawActivityData = this.sPu;
      UiManager_1.UiManager.OpenView("LifePointDrawDetailView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UISprite], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIText], [20, UE.UISpriteTransition], [21, UE.UISpriteTransition]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetButton(0).RootUIComp);
  }
  PlaySequence(e) {
    if (this.$pt) {
      this.$pt.PlaySequence(e);
    }
  }
  SetIndex(e) {
    this.hPu = e % 2 == 0;
  }
  RefreshView(e, i) {
    this._Dt = e;
    this.sPu = i;
    this.lPu(i.Id, e);
    this._Pu(i.Id, e);
    this.A$c(i.Id, e);
    this.cPu(i.Id, e);
    this.dPu(i.Id, e);
    this.mPu(i.Id, e);
    this.fPu(i.Id, e);
    this.P5e(e);
    this.gPu(i.Id, e);
    this.CPu(i.Id, e);
    this.pPu(i.Id, e);
    this.BNe(e);
  }
  BNe(e) {
    RedDotController_1.RedDotController.UnBindGivenUi("LifePointDrawGroupRedDot", this.GetItem(17), e);
    RedDotController_1.RedDotController.BindRedDot("LifePointDrawGroupRedDot", this.GetItem(17), undefined, e);
  }
  _Pu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    i = this.hPu;
    this.GetItem(4).SetUIActive(e && i);
    this.GetItem(5).SetUIActive(e && !i);
    this.GetItem(6).SetUIActive(!e && i);
    this.GetItem(7).SetUIActive(!e && !i);
  }
  async A$c(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    let t = "";
    t = e ? ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(i).HighlightEntranceResource : ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(i).LockHighlightEntranceResource;
    await this.SetSpriteTransitionByPath(t, this.GetUiSpriteTransition(20), 1);
    await this.SetSpriteTransitionByPath(t, this.GetUiSpriteTransition(20), 2);
    let r = "";
    r = e ? ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(i).EntracneGroupNumResource : ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(i).LockEntracneGroupNumResource;
    await this.SetSpriteTransitionByPath(r, this.GetUiSpriteTransition(20), 0);
  }
  lPu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i) ? "T_ColorBoardUnLock" : "T_ColorBoardLock";
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureByPath(i, this.GetTexture(3));
  }
  dPu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    this.GetItem(1)?.SetUIActive(e);
    this.GetItem(2)?.SetUIActive(!e);
  }
  cPu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    this.GetSprite(9)?.SetChangeColor(e);
    this.GetTexture(10)?.SetChangeColor(e);
    this.GetTexture(11)?.SetChangeColor(e);
  }
  mPu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i) ? "SP_TitleBgUnLock" : "SP_TitleBgLock";
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSpriteByPath(i, this.GetSprite(12), false);
  }
  fPu(e, i) {
    e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i) ? "654A17" : "354061";
    this.GetText(13).outlineColor = UE.Color.FromHex(e);
  }
  P5e(e) {
    e = ConfigManager_1.ConfigManager.LifePointDrawConfig.GetLifePointGroupByGroupId(e).Name;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e);
  }
  gPu(e, i) {
    var t = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    var e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupRewardState(e, i);
    var i = t && e;
    var e = t && !e;
    var t = !t;
    this.GetItem(14).SetUIActive(i);
    this.GetItem(15).SetUIActive(e);
    this.GetItem(16).SetUIActive(t);
  }
  CPu(e, i) {
    var t = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i);
    var r = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupRewardState(e, i);
    if (t && !r) {
      t = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupRewardProgress(e, i);
      this.GetText(18).SetText(t);
    } else {
      this.GetText(18).SetText("");
    }
  }
  pPu(e, i) {
    if (ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockState(e, i)) {
      this.GetText(19).SetText("");
    } else {
      e = ModelManager_1.ModelManager.LifePointDrawModel.GetGroupUnlockTime(e, i);
      i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(TimeUtil_1.TimeUtil.GetServerTime() - e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "LifePointUnlockText", i.CountDownText);
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("LifePointDrawGroupRedDot", this.GetItem(17), this._Dt);
  }
}
exports.LifePointDrawItem = LifePointDrawItem;
//# sourceMappingURL=LifePointDrawEntranceView.js.map