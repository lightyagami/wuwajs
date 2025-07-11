"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepPlayerNormalPanel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
const CiacconaGalStepItemContainer_1 = require("./CiacconaGalStepItemContainer");
class CiacconaGalStepPlayerNormalPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.dLc = undefined;
    this.nVc = undefined;
    this.QL1 = undefined;
    this.Hea = undefined;
    this.mLc = () => {
      return new CiacconaGalStepItemContainer_1.CiacconaGalStepItemContainer();
    };
    this.du1 = e => {
      if (e && e.dragComponent === undefined) {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick();
      }
    };
    this.qR1 = () => {
      this.dLc?.ContentUIItem.SetBubbleUpToParent(false);
    };
    this.GR1 = () => {
      this.dLc?.ContentUIItem.SetBubbleUpToParent(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.dLc = this.GetScrollViewWithScrollbar(0);
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.dLc, this.mLc);
    this.dLc.OnScrollViewDownUpCallback.Bind(this.du1);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  async OnBeforeStartAsync() {
    this.nVc = new CiacconaGalFinishBtnItem();
    await this.nVc.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.nVc.SetLocalText(CiacconaGalDefine_1.TEXT_CIACCONA_FINISH_AVG);
  }
  OnBeforeDestroy() {
    this.dLc?.OnScrollViewDownUpCallback.Unbind();
    this.dLc?.Tweener?.OnStartCallBack.Unbind();
    this.dLc?.Tweener?.OnCompleteCallBack.Unbind();
    if (this.QL1 && TimerSystem_1.TimerSystem.Has(this.QL1)) {
      TimerSystem_1.TimerSystem.Remove(this.QL1);
      this.QL1 = undefined;
    }
  }
  Refresh() {
    this.fLc();
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  async PlayCloseAsync() {
    await this.Hea?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
    this.SetActive(false);
  }
  async fLc() {
    const t = ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
    await this.xqe.RefreshByDataAsync(t);
    if (this.QL1 && TimerSystem_1.TimerSystem.Has(this.QL1)) {
      TimerSystem_1.TimerSystem.Remove(this.QL1);
      this.QL1 = undefined;
    }
    this.QL1 = TimerSystem_1.TimerSystem.Delay(() => {
      var e = (0, puerts_1.$ref)(new UE.Vector2D(this.dLc.ContentUIItem.RelativeLocation));
      var i = this.xqe.GetItemByIndex(t.length - 1);
      if (i && i.IsValid()) {
        this.dLc.ScrollToBottom(e, i, true);
        this.dLc.Tweener?.OnStartCallBack.Unbind();
        this.dLc.Tweener?.OnCompleteCallBack.Unbind();
        this.dLc.Tweener?.OnStartCallBack.Bind(this.qR1);
        this.dLc.Tweener?.OnCompleteCallBack.Bind(this.GR1);
      }
    }, CiacconaGalDefine_1.DELAY_SHOW_FOR_TEXT_ANIM + 100);
    var e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId;
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
    this.nVc.SetActive(e.Type === 3 && ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState() === 5);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      var i = e[0];
      if (i === "ChoicesSelect" || i === "FirstChoice") {
        for (const r of this.xqe.GetScrollItemList()) {
          var t = r.GetGuideUiItemAndUiItemForShowEx(e);
          if (t) {
            return t;
          }
        }
      }
    }
  }
}
exports.CiacconaGalStepPlayerNormalPanel = CiacconaGalStepPlayerNormalPanel;
class CiacconaGalFinishBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.mRo = false;
    this.GP1 = undefined;
    this.Hea = undefined;
    this.QUc = () => {
      var e;
      if (this.mRo) {
        e = ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.CurHandlingStepId;
        e = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e).SubEndingId;
        ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e).ClientSetFinished(true);
        ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIExtendToggleTextureTransition]];
    this.BtnBindInfo = [[0, this.QUc]];
  }
  async OnBeforeStartAsync() {
    await this.SetExtendToggleTextureTransitionByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_PlotReasoningIcon03"), this.GetUiExtendToggleTextureTransition(2));
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAfterShow() {
    this.mRo = false;
    var e = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.GP1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = true;
    }, e);
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  OnBeforeDestroy() {
    if (this.GP1 && TimerSystem_1.TimerSystem.Has(this.GP1)) {
      TimerSystem_1.TimerSystem.Remove(this.GP1);
      this.GP1 = undefined;
    }
  }
  SetLocalText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
//# sourceMappingURL=CiacconaGalStepPlayerNormalPanel.js.map