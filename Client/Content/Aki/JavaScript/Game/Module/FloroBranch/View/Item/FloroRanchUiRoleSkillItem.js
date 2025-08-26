"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiRoleSkillItem = undefined;
const UE = require("ue");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
const FloroRanchEntityDebugInfoItem_1 = require("./FloroRanchEntityDebugInfoItem");
const FloroRanchUiItemBase_1 = require("./FloroRanchUiItemBase");
class FloroRanchUiRoleSkillItem extends FloroRanchUiItemBase_1.FloroRanchUiItemBase {
  constructor() {
    super(...arguments);
    this.eXu = undefined;
    this.Lqu = e => {};
    this._Cu = () => {
      this.Lqu?.(this.Entity);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UINiagara]];
    this.BtnBindInfo = [[3, this._Cu]];
  }
  async OnBeforeStartAsync() {}
  async PlayShowAnim() {
    await this.RefreshItem();
    var e = this.GetSpine(1);
    if (e && !e.GetCurrent(0)) {
      e.SetAnimation(0, "idle", true);
    }
    this.GetRootItem().SetUIActive(true);
  }
  async PlaySkillAnim() {
    await this.RefreshItem();
    this.GetSpine(1).SetAnimation(0, "skill", false).AnimationComplete.Add(() => {
      this.GetSpine(1).SetAnimation(0, "idle", true);
    });
    this.GetRootItem().SetUIActive(true);
  }
  async PlayHideAnim() {
    this.GetRootItem().SetUIActive(false);
    var e = this.GetSpine(1);
    if (e) {
      e.ClearTracks();
    }
    await Promise.resolve();
  }
  Pause() {
    this.GetSpine(1).SetTimeScale(0);
  }
  Resume() {
    this.GetSpine(1).SetTimeScale(1);
  }
  async RefreshItem() {
    var e = this.Entity.CheckGetComponent(4);
    var i = e.SkillData;
    var t = e.CanUseSkill();
    this.GetButton(3).SetSelfInteractive(t);
    this.GetUiNiagara(6).SetUIActive(t);
    this.GetText(2).SetText(e.CanUseCount.toString());
    this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(4));
    await Promise.resolve();
  }
  GetRewardPopTransform() {
    return this.GetItem(5).GetOwner().GetTransform();
  }
  BindClickSkillCallback(e) {
    this.Lqu = e;
  }
}
exports.FloroRanchUiRoleSkillItem = FloroRanchUiRoleSkillItem;
//# sourceMappingURL=FloroRanchUiRoleSkillItem.js.map