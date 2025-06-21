"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalStepPlayerReChoosePanel = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
class CiacconaGalReChoosePlainTextItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e)
  }
}
class CiacconaGalReChooseChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.eTt = void 0, this.mRo = !1, this.uP1 = void 0, this.QUc = () => {
      this.eTt && this.mRo && this.eTt()
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
  OnBeforeDestroy() {
    this.J21()
  }
  Refresh(e) {
    this.Z21(), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Text), this.GetExtendToggle(0)?.SetToggleState(e.TogState), this.eTt = e.OnClick, this.ehi(e.IconResId)
  }
  Clear() {
    this.J21()
  }
  SetInteractive(e) {
    this.GetExtendToggle(0)?.SetSelfInteractive(e)
  }
  Z21() {
    this.mRo = !1;
    var e = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.uP1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = !0
    }, e)
  }
  J21() {
    this.uP1 && TimerSystem_1.TimerSystem.Has(this.uP1) && (TimerSystem_1.TimerSystem.Remove(this.uP1), this.uP1 = void 0)
  }
  async ehi(e) {
    var i = this.GetUiExtendToggleTextureTransition(2);
    await this.SetExtendToggleTextureTransitionByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), i)
  }
}
class CiacconaGalReChooseChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.eGe = void 0, this.rLc = () => new CiacconaGalReChooseChoiceItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.rLc)
  }
  Refresh(e, i) {
    this.eGe.RefreshByData([{
      Text: CiacconaGalDefine_1.TEXT_CIACCONA_CHOICE_RESTART,
      TogState: 0,
      IconResId: "T_PlotReasoningIcon03",
      OnClick: e
    }, {
      Text: CiacconaGalDefine_1.TEXT_CIACCONA_CHOICE_RETURN,
      TogState: 0,
      IconResId: "T_PlotReasoningIcon05",
      OnClick: i
    }])
  }
}
class CiacconaGalStepPlayerReChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.KUc = void 0, this.XUc = void 0, this.YUc = void 0, this.zUc = void 0, this.Hea = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [4, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.KUc = new CiacconaGalReChoosePlainTextItem, this.XUc = new CiacconaGalReChooseChoiceItem, this.YUc = new CiacconaGalReChoosePlainTextItem, this.zUc = new CiacconaGalReChooseChoiceList;
    var e = [this.KUc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.XUc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.YUc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.zUc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())];
    await Promise.all(e)
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  Refresh(e, i) {
    this.KUc.Refresh(e.Content), this.KUc.SetUiActive(!!e.Content), this.XUc.Refresh({
      Text: i.Content,
      TogState: 2,
      IconResId: "T_PlotReasoningIcon03"
    }), this.XUc.SetInteractive(!1), this.YUc.Refresh(CiacconaGalDefine_1.TEXT_CIACCONA_RECHOOSE_LABEL), this.zUc.Refresh(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, e, i)
    }, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaReChooseCancel)
    })
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start")
  }
  async PlayCloseAsync() {
    await this.Hea?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise), this.SetActive(!1)
  }
}
exports.CiacconaGalStepPlayerReChoosePanel = CiacconaGalStepPlayerReChoosePanel;
//# sourceMappingURL=CiacconaGalStepPlayerRechoosePanel.js.map