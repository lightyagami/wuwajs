"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  PhantomArenaHeadItem_1 = require("./PhantomArenaHeadItem");
class PhantomArenaRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RoleHead = void 0, this.ViewProxy = void 0, this.Sequence = void 0, this.LastLifeNum = 0, this.IsOwn = !1, this.V21 = () => {
      this.ViewProxy.InCantDragState() || this.ViewProxy.SwitchFourCostTips(this.IsOwn, this.GetItem(5))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UITexture]
    ], this.BtnBindInfo = [
      [4, this.V21]
    ]
  }
  async lJ1() {
    this.RoleHead = new PhantomArenaHeadItem_1.PhantomArenaHeadItem, this.RoleHead.IsOwn = this.IsOwn, this.RoleHead.NeedAddHpEffect = !0, await this.RoleHead.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.IsOwn ? this.ViewProxy.DialogManager.SetOwnDialogItem(this.RoleHead.DialogItem) : this.ViewProxy.DialogManager.SetOpponentDialogItem(this.RoleHead.DialogItem)
  }
  async OnBeforeStartAsync() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), await Promise.all([this.lJ1()])
  }
  OnStart() {
    this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(4))
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  RefreshLifeNum(e, t) {
    this.LastLifeNum = e, this.GetText(2).SetText(e + "/" + t), this.RoleHead.RefreshLifeBar(e / t)
  }
  RefreshLifeNumTween(e, t) {
    this.GetText(2).SetText(Math.floor(e) + "/" + t), this.RoleHead.RefreshDamageBar(e / t)
  }
  RefreshLifeNumTweenStart(e, t) {
    this.RoleHead.RefreshLifeBar(e / t)
  }
  SetBarActive(e) {
    this.RoleHead.SetBarActive(e)
  }
  SetPhantomBtnActive(e) {
    this.GetButton(4).RootUIComp.SetUIActive(e)
  }
  ShowPhantomBtn() {
    this.SetPhantomBtnActive(!0), this.Sequence.PlaySequencePurely("4cShow")
  }
  RefreshHeadIcon(e) {
    this.RoleHead.RefreshRoleIcon(e)
  }
  RefreshMonsterIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(6))
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e
  }
  PlayAddHpEffect(e) {
    0 < e - this.LastLifeNum && this.RoleHead.PlayAddHpEffect(e - this.LastLifeNum)
  }
  PlayHitAnim() {
    this.Sequence.PlaySequencePurely("Hit")
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && 0 !== e.length && "Task" === e[0] ? this.ViewProxy?.DetailsTipsItem?.GetGuideUiItemAndUiItemForShowEx(e) : void 0
  }
}
exports.PhantomArenaRoleItem = PhantomArenaRoleItem;
//# sourceMappingURL=PhantomArenaRoleItem.js.map