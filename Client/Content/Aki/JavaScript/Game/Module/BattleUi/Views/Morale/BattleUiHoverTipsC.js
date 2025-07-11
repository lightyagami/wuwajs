"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiHoverTipsC = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BattleUiHoverTipsC extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Hmt = false;
    this.TDe = undefined;
    this.SPe = undefined;
    this.LAe = undefined;
    this.xKt = undefined;
    this.EndShow = () => {
      if (this.TDe) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
    };
    this.eRe = () => {
      if (this.TDe) {
        this.EndShow();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo);
      }
    };
  }
  Initialize(e) {
    super.Initialize(e);
  }
  async InitializeAsync() {
    var e = this.GetItem(1);
    this.xKt = new BattleUiInfoItem();
    await this.xKt.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.RootItem?.SetAnchorHAlign(2);
    this.RootItem?.SetAnchorVAlign(1);
    this.RootItem?.SetAnchorOffsetX(0);
    this.RootItem?.SetAnchorOffsetY(0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    });
  }
  CreateAndShow(e, t) {
    if (this.Hmt) {
      this.UpdateInfo(t);
      this.SetActive(true);
      this.Wmt();
    } else {
      this.NewByResourceId(e, "UiItem_HoverTipsC").finally(() => {
        this.Hmt = true;
        this.UpdateInfo(t);
        this.Wmt();
      });
    }
  }
  OnShowBattleChildView() {
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely("Start");
  }
  UpdateInfo(e) {
    this.LAe = e;
    if (this.Hmt) {
      this.xKt?.Refresh(this.LAe);
    }
  }
  Wmt() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(this.eRe, 8000);
  }
  OnBeforeDestroy() {
    this.eRe();
  }
}
exports.BattleUiHoverTipsC = BattleUiHoverTipsC;
class BattleUiInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AZs = undefined;
    this.Bqe = () => new BattleUiDescInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [2, UE.UILayoutBase], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.AZs = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.Bqe);
  }
  Refresh(e) {
    this.AZs.RefreshByData(e.DescInfoList);
    var t = this.GetText(0);
    t?.SetUIActive(!!e.TitleKey);
    if (e.TitleKey) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.TitleKey);
    }
  }
}
class BattleUiDescInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    var t = this.GetText(1);
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.DescKey);
    i?.SetUIActive(!!e.TitleKey);
    if (e.TitleKey) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TitleKey);
    }
  }
}
//# sourceMappingURL=BattleUiHoverTipsC.js.map