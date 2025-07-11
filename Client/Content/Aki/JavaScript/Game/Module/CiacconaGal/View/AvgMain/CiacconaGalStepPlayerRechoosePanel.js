"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalStepPlayerReChoosePanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
const CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
class CiacconaGalReChoosePlainTextItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
class CiacconaGalReChooseChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eTt = undefined;
    this.mRo = false;
    this.GP1 = undefined;
    this.QUc = () => {
      if (this.eTt && this.mRo) {
        this.eTt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIExtendToggleTextureTransition]];
    this.BtnBindInfo = [[0, this.QUc]];
  }
  OnBeforeDestroy() {
    this.wG1();
  }
  Refresh(e) {
    this.AG1();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Text);
    this.GetExtendToggle(0)?.SetToggleState(e.TogState);
    this.eTt = e.OnClick;
    this.ehi(e.IconResId);
  }
  Clear() {
    this.wG1();
  }
  SetInteractive(e) {
    this.GetExtendToggle(0)?.SetSelfInteractive(e);
  }
  AG1() {
    this.mRo = false;
    var e = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.GP1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.mRo = true;
    }, e);
  }
  wG1() {
    if (this.GP1 && TimerSystem_1.TimerSystem.Has(this.GP1)) {
      TimerSystem_1.TimerSystem.Remove(this.GP1);
      this.GP1 = undefined;
    }
  }
  async ehi(e) {
    var i = this.GetUiExtendToggleTextureTransition(2);
    await this.SetExtendToggleTextureTransitionByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), i);
  }
}
class CiacconaGalReChooseChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.rLc = () => new CiacconaGalReChooseChoiceItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.rLc);
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
    }]);
  }
}
class CiacconaGalStepPlayerReChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KUc = undefined;
    this.XUc = undefined;
    this.YUc = undefined;
    this.zUc = undefined;
    this.Hea = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.KUc = new CiacconaGalReChoosePlainTextItem();
    this.XUc = new CiacconaGalReChooseChoiceItem();
    this.YUc = new CiacconaGalReChoosePlainTextItem();
    this.zUc = new CiacconaGalReChooseChoiceList();
    var e = [this.KUc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.XUc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.YUc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.zUc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())];
    await Promise.all(e);
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e, i) {
    this.KUc.Refresh(e.Content);
    this.KUc.SetUiActive(!!e.Content);
    this.XUc.Refresh({
      Text: i.Content,
      TogState: 2,
      IconResId: "T_PlotReasoningIcon03"
    });
    this.XUc.SetInteractive(false);
    this.YUc.Refresh(CiacconaGalDefine_1.TEXT_CIACCONA_RECHOOSE_LABEL);
    this.zUc.Refresh(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaReChooseConfirm, e, i);
    }, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaReChooseCancel);
    });
  }
  PlayStart() {
    this.Hea?.PlayLevelSequenceByName("Start");
  }
  async PlayCloseAsync() {
    await this.Hea?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
    this.SetActive(false);
  }
}
exports.CiacconaGalStepPlayerReChoosePanel = CiacconaGalStepPlayerReChoosePanel;
//# sourceMappingURL=CiacconaGalStepPlayerRechoosePanel.js.map