"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateCounterAttack extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.弹反摄像机预设 = undefined;
    this.弹反特效预设 = undefined;
    this.弹反设置 = undefined;
    this.生成子弹ID = undefined;
    this.AnMessageId = undefined;
    this.SkillId = 0;
  }
  Constructor() {
    this.AnMessageId = undefined;
    this.SkillId = 0;
  }
  K2_NotifyBegin(t, i, e) {
    t = t.GetOwner();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 20, "CounterAttack Begin", ["Owner", t?.GetName()]);
    }
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.CharacterActorComponent?.Entity;
      if (!t?.Valid) {
        return false;
      }
      var s = t.GetComponent(222);
      this.AnMessageId = s?.CreateAnimNotifyContent(i.GetName(), this.exportIndex);
      var s = t.GetComponent(43);
      var i = t.GetComponent(66);
      if (!s?.Valid || !i?.Valid) {
        return false;
      }
      if (!this.弹反设置) {
        return false;
      }
      i.SetCounterAttackAnsInfo(this.AnMessageId, this.exportIndex);
      if (this.弹反摄像机预设 || this.弹反特效预设) {
        t = new UE.SCounterAttack(this.弹反设置?.弹反部位, this.弹反设置?.无弹反动作效果, this.弹反设置?.有弹反动作效果, this.弹反设置?.削韧倍率, this.弹反设置?.最大触发距离, this.弹反设置?.最大触发夹角, this.弹反设置?.被弹反者应用BuffID, this.弹反设置?.攻击者应用BuffID, this.弹反设置?.受击动画忽略Buff检测, this.弹反设置?.检测Buff列表, this.弹反设置?.ANS期间被弹反者生效的BuffID, this.弹反设置?.结束事件Tag, this.弹反设置?.QTE弹刀忽略角度距离检测);
        if (this.弹反摄像机预设) {
          t.无弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData;
          t.无弹反动作效果.攻击者顿帧 = this.弹反摄像机预设.AttackerTimeScale;
          t.无弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale;
          t.无弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake;
          t.有弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData;
          t.有弹反动作效果.攻击者顿帧 = this.弹反摄像机预设.AttackerTimeScale;
          t.有弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale;
          t.有弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake;
        }
        if (this.弹反特效预设) {
          t.无弹反动作效果.特效DA = this.弹反特效预设.EffectDA;
          t.无弹反动作效果.特效Offset = this.弹反特效预设.Offset;
          t.无弹反动作效果.特效Scale = this.弹反特效预设.Scale;
          t.有弹反动作效果.特效DA = this.弹反特效预设.EffectDA;
          t.有弹反动作效果.特效Offset = this.弹反特效预设.Offset;
          t.有弹反动作效果.特效Scale = this.弹反特效预设.Scale;
        }
        i.SetCounterAttackInfo(t);
        i.SetCounterAttackEndTime(e);
        return true;
      }
      this.SkillId = s.GetCurrentMontageCorrespondingSkillId();
      i.SetCounterAttackInfo(this.弹反设置);
      i.SetCounterAttackEndTime(e);
    }
    return true;
  }
  K2_NotifyEnd(i, t) {
    const e = i.GetOwner();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 20, "CounterAttack End", ["Owner", e?.GetName()]);
    }
    if (e instanceof TsBaseCharacter_1.default) {
      var s = e.CharacterActorComponent?.Entity;
      if (!s?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "CounterAttack End entity not valid", ["Owner", e?.GetName()]);
        }
        return false;
      }
      var r = s.GetComponent(43);
      var s = s.GetComponent(66);
      if (!r?.Valid || !s?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "CounterAttack End skillComp or hitComp not valid", ["Owner", e?.GetName()], ["SkillComp", r?.Valid], ["HitComp", s?.Valid]);
        }
        return false;
      }
      r = s.HadTriggerCounterAttack;
      s.CounterAttackEnd();
      if (!r) {
        if (FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID)) {
          return false;
        }
        BulletUtil_1.BulletUtil.CreateBulletFromAN(e, this.生成子弹ID.toString(), undefined, this.SkillId, false, this.AnMessageId);
      }
      return true;
    }
    if (!FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID)) {
      if ((s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e.GetWorld())) === 2 || s === 4) {
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BPL_BulletPreview_C", () => {
          var t = UE.KismetSystemLibrary.GetOuterObject(this);
          var t = UE.KismetSystemLibrary.GetPathName(t);
          UE.BPL_BulletPreview_C.ShowBulletPreview(t, this.生成子弹ID, e, i, e.GetWorld(), undefined);
        });
      }
    }
    return false;
  }
  GetNotifyName() {
    return "弹反配置";
  }
}
exports.default = TsAnimNotifyStateCounterAttack;
//# sourceMappingURL=TsAnimNotifyStateCounterAttack.js.map