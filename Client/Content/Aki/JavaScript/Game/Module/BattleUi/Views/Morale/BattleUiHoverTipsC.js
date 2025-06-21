"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleUiHoverTipsC = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView");
class BattleUiHoverTipsC extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments), this.Hmt = !1, this.TDe = void 0, this.SPe = void 0, this.LAe = void 0, this.xKt = void 0, this.EndShow = () => {
      this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0), this.SPe?.StopCurrentSequence(), this.SPe?.PlayLevelSequenceByName("Close")
    }, this.eRe = () => {
      this.TDe && (this.EndShow(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiToggleMoraleBuffInfo))
    }
  }
  Initialize(e) {
    super.Initialize(e)
  }
  async InitializeAsync() {
    var e = this.GetItem(1);
    this.xKt = new BattleUiInfoItem, await this.xKt.CreateThenShowByActorAsync(e.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  OnStart() {
    this.RootItem?.SetAnchorHAlign(2), this.RootItem?.SetAnchorVAlign(1), this.RootItem?.SetAnchorOffsetX(0), this.RootItem?.SetAnchorOffsetY(0), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SPe.BindSequenceCloseEvent(e => {
      "Close" === e && this.SetActive(!1)
    })
  }
  CreateAndShow(e, t) {
    this.Hmt ? (this.UpdateInfo(t), this.SetActive(!0), this.Wmt()) : this.NewByResourceId(e, "UiItem_HoverTipsC").finally(() => {
      this.Hmt = !0, this.UpdateInfo(t), this.Wmt()
    })
  }
  OnShowBattleChildView() {
    this.SPe.StopCurrentSequence(), this.SPe.PlaySequencePurely("Start")
  }
  UpdateInfo(e) {
    this.LAe = e, this.Hmt && this.xKt?.Refresh(this.LAe)
  }
  Wmt() {
    this.TDe = TimerSystem_1.TimerSystem.Delay(this.eRe, 8e3)
  }
  OnBeforeDestroy() {
    this.eRe()
  }
}
exports.BattleUiHoverTipsC = BattleUiHoverTipsC;
class BattleUiInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.AZs = void 0, this.Bqe = () => new BattleUiDescInfoItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [2, UE.UILayoutBase],
      [1, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.AZs = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.Bqe)
  }
  Refresh(e) {
    this.AZs.RefreshByData(e.DescInfoList);
    var t = this.GetText(0);
    t?.SetUIActive(!!e.TitleKey), e.TitleKey && LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.TitleKey)
  }
}
class BattleUiDescInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  Refresh(e) {
    var t = this.GetText(1),
      i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.DescKey), i?.SetUIActive(!!e.TitleKey), e.TitleKey && LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.TitleKey)
  }
}
//# sourceMappingURL=BattleUiHoverTipsC.js.map