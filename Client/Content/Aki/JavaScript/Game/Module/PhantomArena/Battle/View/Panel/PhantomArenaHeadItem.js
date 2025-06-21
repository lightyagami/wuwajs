"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaHeadItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  PhantomArenaDialogItem_1 = require("./PhantomArenaDialogItem");
class AddHpItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.Nno = e => {
      "Start" === e ? this.PlayClose() : "Close" === e && this.SetActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnDestroy() {
    this.Sequence.Clear()
  }
  RefreshAddHpNum(e) {
    this.GetText(0).SetText(e.toString())
  }
  PlayStart() {
    this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Start")
  }
  PlayClose() {
    this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Close")
  }
}
class PhantomArenaHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.DialogItem = void 0, this.IsOwn = !1, this.NeedAddHpEffect = !1, this.SequencePlayer = void 0, this.AddHpItem = void 0, this.xsu = e => {
      "DamageAccumulate" === e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBattleDamageAccumulateEnd)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UISprite]
    ]
  }
  async InitAddHpItem() {
    this.NeedAddHpEffect && (this.AddHpItem = new AddHpItem, await this.AddHpItem.CreateByResourceIdAsync("PnlRoleAddHp", this.GetItem(3)))
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SequencePlayer.BindSequenceCloseEvent(this.xsu), this.RefreshDamageBar(0)
  }
  async _J1() {
    this.DialogItem = new PhantomArenaDialogItem_1.PhantomArenaDialogItem, this.IsOwn ? await this.DialogItem.CreateByResourceIdAsync("PnlRoleDialogUp", this.GetItem(3)) : await this.DialogItem.CreateByResourceIdAsync("PnlRoleDialogDown", this.GetItem(3))
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitAddHpItem(), this._J1()])
  }
  SetBarActive(e) {
    this.GetSprite(1).SetUIActive(e), this.GetSprite(2).SetUIActive(!e)
  }
  RefreshLifeBar(e) {
    this.GetSprite(2).SetFillAmount(e), this.GetSprite(1).SetFillAmount(e)
  }
  RefreshDamageBar(e) {
    this.GetSprite(4)?.SetFillAmount(e)
  }
  RefreshRoleIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(0))
  }
  GetAttachItem() {
    return this.GetItem(3)
  }
  PlayAccumulateDamage() {
    this.SequencePlayer?.PlayLevelSequenceByName("DamageAccumulate")
  }
  PlayAddHpEffect(e) {
    this.AddHpItem.RefreshAddHpNum(e), this.AddHpItem.PlayStart()
  }
}
exports.PhantomArenaHeadItem = PhantomArenaHeadItem;
//# sourceMappingURL=PhantomArenaHeadItem.js.map