"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFieldArea = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const PhantomArenaFieldItem_1 = require("./PhantomArenaFieldItem");
class PhantomArenaFieldArea extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.FieldItem = undefined;
    this.Sequence = undefined;
    this.FieldData = undefined;
    this.I9m = (i, t) => {
      this.ViewProxy.FieldPointerEnter(i, t, false);
    };
    this.$xt = i => {
      if (i === "Close") {
        this.FieldItem.SetFieldItemActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.FieldItem = new PhantomArenaFieldItem_1.PhantomArenaFieldItem();
    this.FieldItem.SetInteractClickCallback(this.ViewProxy.FieldInteractClick);
    this.FieldItem.SetFinishSkillInteractCallback(this.ViewProxy.FieldFinishSkillInteract);
    this.FieldItem.SetPointerEnterCallback(this.I9m);
    this.FieldItem.SetPointerExitCallback(this.ViewProxy.FieldPointerExit);
    await this.FieldItem.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.$xt);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  u1f() {
    var i;
    var t;
    if (this.FieldData.CardData) {
      i = this.GetUiNiagara(2);
      t = this.GetUiNiagara(3);
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldLightColor)) {
        i.SetColor(UE.Color.FromHex(this.FieldData.FieldLightColor));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldReleaseColor)) {
        t.SetColor(UE.Color.FromHex(this.FieldData.FieldReleaseColor));
      }
    }
  }
  async d1f() {
    var i;
    if (this.FieldData.CardData) {
      i = [];
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldSkillTexRelease)) {
        i.push(this.SetTextureAsync(this.FieldData.FieldSkillTexRelease, this.GetTexture(4)));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldSkillTexBg)) {
        i.push(this.SetTextureAsync(this.FieldData.FieldSkillTexBg, this.GetTexture(5)));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldSkillTexIcon)) {
        i.push(this.SetTextureAsync(this.FieldData.FieldSkillTexIcon, this.GetTexture(6)));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldTexSmokeColor)) {
        this.GetTexture(7)?.SetColor(UE.Color.FromHex(this.FieldData.FieldTexSmokeColor));
      }
      await Promise.all(i);
    }
  }
  async c1f() {
    var i = new CustomPromise_1.CustomPromise();
    if (this.FieldData.CardData?.IsNpcCard) {
      await this.Sequence.PlaySequenceAsync("ReleaseNPC", i, true);
    } else {
      await this.Sequence.PlaySequenceAsync("ReleasePlayer", i, true);
    }
  }
  async Refresh(i) {
    this.FieldData = i;
    this.u1f();
    await Promise.all([this.FieldItem.Refresh(i), this.d1f()]);
  }
  async RefreshSelf() {
    this.u1f();
    await Promise.all([this.FieldItem.RefreshSelf(), this.d1f()]);
  }
  async TriggerSkill() {
    this.u1f();
    this.FieldItem.UseSkill();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.FieldItem.GetFieldDesc());
    await this.c1f();
  }
  ResetSkillTrigger() {
    this.FieldItem.ResetSkill();
  }
  RegisterViewProxy(i) {
    this.ViewProxy = i;
  }
  SwitchFieldState(i) {
    if (this.FieldData.CardData && i) {
      this.FieldItem.SetFieldItemActive(true);
      this.Sequence.PlaySequence("Start");
    } else {
      this.Sequence.PlaySequence("Close");
    }
  }
}
exports.PhantomArenaFieldArea = PhantomArenaFieldArea;
//# sourceMappingURL=PhantomArenaFieldArea.js.map