"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateCounterAttack extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), this.弹反摄像机预设 = void 0, this.弹反特效预设 = void 0, this.弹反设置 = void 0, this.生成子弹ID = void 0, this.AnMessageId = void 0, this.SkillId = 0
  }
  Constructor() {
    this.AnMessageId = void 0, this.SkillId = 0
  }
  K2_NotifyBegin(t, i, s) {
    t = t.GetOwner();
    if (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 20, "CounterAttack Begin", ["Owner", t?.GetName()]), t instanceof TsBaseCharacter_1.default) {
      t = t.CharacterActorComponent?.Entity;
      if (!t?.Valid) return !1;
      var e = t.GetComponent(209),
        e = (this.AnMessageId = e?.CreateAnimNotifyContent(i.GetName(), this.exportIndex), t.GetComponent(40)),
        i = t.GetComponent(61);
      if (!e?.Valid || !i?.Valid) return !1;
      if (!this.弹反设置) return !1;
      if (i.SetCounterAttackAnsInfo(this.AnMessageId, this.exportIndex), this.弹反摄像机预设 || this.弹反特效预设) return t = new UE.SCounterAttack(this.弹反设置?.弹反部位, this.弹反设置?.无弹反动作效果, this.弹反设置?.有弹反动作效果, this.弹反设置?.削韧倍率, this.弹反设置?.最大触发距离, this.弹反设置?.最大触发夹角, this.弹反设置?.被弹反者应用BuffID, this.弹反设置?.攻击者应用BuffID, this.弹反设置?.受击动画忽略Buff检测, this.弹反设置?.检测Buff列表, this.弹反设置?.ANS期间被弹反者生效的BuffID, this.弹反设置?.结束事件Tag, this.弹反设置?.QTE弹刀忽略角度距离检测), this.弹反摄像机预设 && (t.无弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData, t.无弹反动作效果.攻击者顿帧 = this.弹反摄像机预设.AttackerTimeScale, t.无弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale, t.无弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake, t.有弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData, t.有弹反动作效果.攻击者顿帧 = this.弹反摄像机预设.AttackerTimeScale, t.有弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale, t.有弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake), this.弹反特效预设 && (t.无弹反动作效果.特效DA = this.弹反特效预设.EffectDA, t.无弹反动作效果.特效Offset = this.弹反特效预设.Offset, t.无弹反动作效果.特效Scale = this.弹反特效预设.Scale, t.有弹反动作效果.特效DA = this.弹反特效预设.EffectDA, t.有弹反动作效果.特效Offset = this.弹反特效预设.Offset, t.有弹反动作效果.特效Scale = this.弹反特效预设.Scale), i.SetCounterAttackInfo(t), i.SetCounterAttackEndTime(s), !0;
      this.SkillId = e.GetCurrentMontageCorrespondingSkillId(), i.SetCounterAttackInfo(this.弹反设置), i.SetCounterAttackEndTime(s)
    }
    return !0
  }
  K2_NotifyEnd(t, i) {
    var s = t.GetOwner();
    if (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 20, "CounterAttack End", ["Owner", s?.GetName()]), s instanceof TsBaseCharacter_1.default) {
      var e = s.CharacterActorComponent?.Entity;
      if (!e?.Valid) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "CounterAttack End entity not valid", ["Owner", s?.GetName()]), !1;
      var r = e.GetComponent(40),
        e = e.GetComponent(61);
      if (!r?.Valid || !e?.Valid) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "CounterAttack End skillComp or hitComp not valid", ["Owner", s?.GetName()], ["SkillComp", r?.Valid], ["HitComp", e?.Valid]), !1;
      var r = e.HadTriggerCounterAttack;
      if (e.CounterAttackEnd(), !r) {
        if (FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID)) return !1;
        BulletUtil_1.BulletUtil.CreateBulletFromAN(s, this.生成子弹ID.toString(), void 0, this.SkillId, !1, this.AnMessageId)
      }
      return !0
    }
    return FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID) || (2 !== (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(s.GetWorld())) && 4 !== e || (r = UE.KismetSystemLibrary.GetOuterObject(this), e = UE.KismetSystemLibrary.GetPathName(r), UE.BPL_BulletPreview_C.ShowBulletPreview(e, this.生成子弹ID, s, t, s.GetWorld(), void 0))), !1
  }
  GetNotifyName() {
    return "弹反配置"
  }
}
exports.default = TsAnimNotifyStateCounterAttack;
//# sourceMappingURL=TsAnimNotifyStateCounterAttack.js.map