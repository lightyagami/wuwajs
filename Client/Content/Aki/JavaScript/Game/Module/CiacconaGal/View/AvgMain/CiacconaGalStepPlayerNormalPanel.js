"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalStepPlayerNormalPanel = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalUtils_1 = require("../../CiacconaGalUtils"),
  CiacconaGalStepItemContainer_1 = require("./CiacconaGalStepItemContainer");
class CiacconaGalStepPlayerNormalPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.xqe = void 0, this.dLc = void 0, this.nVc = void 0, this.SL1 = void 0, this.Hea = void 0, this.mLc = () => {
      return new CiacconaGalStepItemContainer_1.CiacconaGalStepItemContainer
    }, this.Hc1 = e => {
      e && void 0 === e.dragComponent && ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick()
    }, this.dR1 = () => {
      this.dLc?.ContentUIItem.SetBubbleUpToParent(!1)
    }, this.mR1 = () => {
      this.dLc?.ContentUIItem.SetBubbleUpToParent(!0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem]
    ]
  }
  OnStart() {
    this.dLc = this.GetScrollViewWithScrollbar(0), this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.dLc, this.mLc), this.dLc.OnScrollViewDownUpCallback.Bind(this.Hc1), this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  async OnBeforeStartAsync() {
    this.nVc = new CiacconaGalFinishBtnItem, await this.nVc.CreateByActorAsync(this.GetItem(2).GetOwner()), this.nVc.SetLocalText(CiacconaGalDefine_1.TEXT_CIACCONA_FINISH_AVG)
  }
  OnBeforeDestroy() {
    this.dLc?.OnScrollViewDownUpCallback.Unbind(), this.dLc?.Tweener?.OnStartCallBack.Unbind(), this.dLc?.Tweener?.OnCompleteCallBack.Unbind(), this.SL1 && TimerSystem_1.TimerSystem.Has(this.SL1) && (TimerSystem_1.TimerSystem.Remove(this.SL1), this.SL1 = void 0)
  }
  Refresh() {
    this.fLc()
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start")
  }
  async PlayCloseAsync() {
    await this.Hea?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise), this.SetActive(!1)
  }
  async fLc() {
    const t = ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
    await this.xqe.RefreshByDataAsync(t), this.SL1 && TimerSystem_1.TimerSystem.Has(this.SL1) && (TimerSystem_1.TimerSystem.Remove(this.SL1), this.SL1 = void 0), this.SL1 = TimerSystem_1.TimerSystem.Delay(() => {
      var e = (0, puerts_1.$ref)(new UE.Vector2D(this.dLc.ContentUIItem.RelativeLocation)),
        i = this.xqe.GetItemByIndex(t.length - 1);
      i && i.IsValid() && (this.dLc.ScrollToBottom(e, i, !0), this.dLc.Tweener?.OnStartCallBack.Unbind(), this.dLc.Tweener?.OnCompleteCallBack.Unbind(), this.dLc.Tweener?.OnStartCallBack.Bind(this.dR1), this.dLc.Tweener?.OnCompleteCallBack.Bind(this.mR1))
    }, CiacconaGalDefine_1.DELAY_SHOW_FOR_TEXT_ANIM + 100);
    var e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId,
      e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
    this.nVc.SetActive(3 === e.Type && 5 === ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState())
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) {
      var i = e[0];
      if ("ChoicesSelect" === i || "FirstChoice" === i)
        for (const r of this.xqe.GetScrollItemList()) {
          var t = r.GetGuideUiItemAndUiItemForShowEx(e);
          if (t) return t
        }
    }
  }
}
exports.CiacconaGalStepPlayerNormalPanel = CiacconaGalStepPlayerNormalPanel;
class CiacconaGalFinishBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.mRo = !1, this.uP1 = void 0, this.Hea = void 0, this.QUc = () => {
      var e;
      this.mRo && (e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId, e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e).SubEndingId, ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e).ClientSetFinished(!0), ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIExtendToggleTextureTransition]
    ], this.BtnBindInfo = [
      [0, this.QUc]
    ]
  }
  async OnBeforeStartAsync() {
    await this.SetExtendToggleTextureTransitionByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon03"), this.GetUiExtendToggleTextureTransition(2))
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  OnAfterShow() {
    this.mRo = !1;
    var e = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.uP1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = !0
    }, e), this.Hea?.PlayLevelSequenceByName("Start")
  }
  OnBeforeDestroy() {
    this.uP1 && TimerSystem_1.TimerSystem.Has(this.uP1) && (TimerSystem_1.TimerSystem.Remove(this.uP1), this.uP1 = void 0)
  }
  SetLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e)
  }
}
//# sourceMappingURL=CiacconaGalStepPlayerNormalPanel.js.map