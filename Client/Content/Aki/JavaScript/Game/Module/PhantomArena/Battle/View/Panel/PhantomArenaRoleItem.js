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
    this.ShieldSequence = undefined;
    this.LastLifeNum = 0;
    this.LastShieldNum = 0;
    this.IsOwn = false;
    this.$xt = t => {
      if (t === "ShiedBreak") {
        this.GetItem(7).SetUIActive(false);
      }
    };
    this.vG1 = () => {
      if (!this.ViewProxy.InCantDragState()) {
        this.ViewProxy.SwitchFourCostTips(this.IsOwn, this.GetItem(5));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText]];
    this.BtnBindInfo = [[4, this.vG1]];
  }
  async RZ1() {
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
    await Promise.all([this.RZ1()]);
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.ShieldSequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(7));
    this.ShieldSequence.BindOnEndSequenceEvent(this.$xt);
    this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(4));
    this.GetItem(7).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.ShieldSequence.Clear();
  }
  RefreshLifeNum(t, i) {
    this.LastLifeNum = t;
    this.GetText(2).SetText(t + "/" + i);
    this.RoleHead.RefreshLifeBar(t / i);
  }
  RefreshLifeNumTween(t, i) {
    this.LastLifeNum = t;
    this.GetText(2).SetText(Math.floor(t) + "/" + i);
    this.RoleHead.RefreshDamageBar(t / i);
  }
  RefreshLifeNumTweenStart(t, i) {
    this.RoleHead.RefreshLifeBar(t / i);
  }
  SetBarActive(t) {
    this.RoleHead.SetBarActive(t);
  }
  SetPhantomBtnActive(t) {
    this.GetButton(4).RootUIComp.SetUIActive(t);
  }
  ShowPhantomBtn() {
    this.SetPhantomBtnActive(true);
    this.Sequence.PlaySequencePurely("4cShow");
  }
  RefreshHeadIcon(t) {
    this.RoleHead.RefreshRoleIcon(t);
  }
  RefreshMonsterIcon(t) {
    this.SetTextureByPath(t, this.GetTexture(6));
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  PlayHpEffect(t) {
    t -= this.LastLifeNum;
    if (t > 0) {
      this.RoleHead.PlayAddHpEffect(t);
    } else if (t < 0) {
      this.RoleHead.PlayReduceHpEffect(t);
    }
  }
  PlayHitAnim() {
    this.Sequence.PlaySequencePurely("Hit");
  }
  RefreshShieldNum(t) {
    var i;
    if (t > this.LastShieldNum && this.LastShieldNum === 0) {
      this.GetText(8).SetText(t.toString());
      this.ShieldSequence.PlaySequencePurely("ShieldStart");
      this.GetItem(7).SetUIActive(true);
    } else if (t >= this.LastShieldNum) {
      this.GetText(8).SetText(t.toString());
    } else if (t === 0) {
      this.ShieldSequence.PlaySequencePurely("ShiedBreak");
    } else {
      i = t - this.LastShieldNum;
      this.GetText(8).SetText(t.toString());
      this.GetText(9).SetText(i.toString());
      this.ShieldSequence.PlaySequencePurely("ShieldHit");
    }
    this.LastShieldNum = t;
  }
  async PlayBeHitEffect(t) {
    await this.RoleHead.PlayReduceHpEffect(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && t.length !== 0 && t[0] === "Task") {
      return this.ViewProxy?.DetailsTipsItem?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaRoleItem = PhantomArenaRoleItem;
//# sourceMappingURL=PhantomArenaRoleItem.js.map