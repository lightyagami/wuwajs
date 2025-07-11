"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaHeadItem_1 = require("./PhantomArenaHeadItem");
class PhantomArenaRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleHead = undefined;
    this.ViewProxy = undefined;
    this.Sequence = undefined;
    this.LastLifeNum = 0;
    this.IsOwn = false;
    this.vG1 = () => {
      if (!this.ViewProxy.InCantDragState()) {
        this.ViewProxy.SwitchFourCostTips(this.IsOwn, this.GetItem(5));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UITexture]];
    this.BtnBindInfo = [[4, this.vG1]];
  }
  async tZ1() {
    this.RoleHead = new PhantomArenaHeadItem_1.PhantomArenaHeadItem();
    this.RoleHead.IsOwn = this.IsOwn;
    this.RoleHead.NeedAddHpEffect = true;
    await this.RoleHead.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    if (this.IsOwn) {
      this.ViewProxy.DialogManager.SetOwnDialogItem(this.RoleHead.DialogItem);
    } else {
      this.ViewProxy.DialogManager.SetOpponentDialogItem(this.RoleHead.DialogItem);
    }
  }
  async OnBeforeStartAsync() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    await Promise.all([this.tZ1()]);
  }
  OnStart() {
    this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(4));
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  RefreshLifeNum(e, t) {
    this.LastLifeNum = e;
    this.GetText(2).SetText(e + "/" + t);
    this.RoleHead.RefreshLifeBar(e / t);
  }
  RefreshLifeNumTween(e, t) {
    this.GetText(2).SetText(Math.floor(e) + "/" + t);
    this.RoleHead.RefreshDamageBar(e / t);
  }
  RefreshLifeNumTweenStart(e, t) {
    this.RoleHead.RefreshLifeBar(e / t);
  }
  SetBarActive(e) {
    this.RoleHead.SetBarActive(e);
  }
  SetPhantomBtnActive(e) {
    this.GetButton(4).RootUIComp.SetUIActive(e);
  }
  ShowPhantomBtn() {
    this.SetPhantomBtnActive(true);
    this.Sequence.PlaySequencePurely("4cShow");
  }
  RefreshHeadIcon(e) {
    this.RoleHead.RefreshRoleIcon(e);
  }
  RefreshMonsterIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(6));
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e;
  }
  PlayAddHpEffect(e) {
    if (e - this.LastLifeNum > 0) {
      this.RoleHead.PlayAddHpEffect(e - this.LastLifeNum);
    }
  }
  PlayHitAnim() {
    this.Sequence.PlaySequencePurely("Hit");
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && e.length !== 0 && e[0] === "Task") {
      return this.ViewProxy?.DetailsTipsItem?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaRoleItem = PhantomArenaRoleItem;
//# sourceMappingURL=PhantomArenaRoleItem.js.map