"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayingMontageInfo = exports.PlayMontageConfig = exports.PlayMontageUtils = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterAnimationComponent_1 = require("../../Common/Component/CharacterAnimationComponent");
const SECOND_TO_MILLISECOND = 1000;
class PlayMontageUtils {
  static yad() {
    return ++this.Sad;
  }
  static IsPlayingMontage(t) {
    return this.G2r.has(t);
  }
  static EntityIsPlayingMontage(t) {
    if (this.Mad.has(t)) {
      return this.Mad.get(t);
    } else {
      return 0;
    }
  }
  static LoadAndPlayMontageById(t, i, e, s = undefined, a = undefined, o = undefined) {
    let n = undefined;
    if (n = i.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(i.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(i.MontageId)) {
      return this.LoadAndPlayMontage(t, n.ActionMontage, e, s, a, o);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "[NpcMontage] 当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格", ["EntityId", t.Actor.EntityId], ["MontageId", i.MontageId], ["IsABP", i.IsAbp]);
      }
      return -1;
    }
  }
  static LoadAndPlayMontageByOverlapId(t, i, e, s = undefined, a = undefined, o = undefined) {
    var n = ModelManager_1.ModelManager.PlotModel.GetOverlayAbpMontageConfig(i);
    if (n) {
      n = this.LoadAndPlayMontage(t, n.ActionMontage, e, s, a, o);
      if (t instanceof CharacterAnimationComponent_1.CharacterAnimationComponent && !t.EnableLowerBlend) {
        t.EnableLowerBlend = true;
        this.Tmd.add(n);
      }
      return n;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "[NpcMontage] 当前MontageId无效,找不到相关蒙太奇配置,请检查叠加蒙太奇csv表格", ["EntityId", t.Entity.Id], ["MontageId", i]);
      }
      return -1;
    }
  }
  static LoadAndPlayMontage(e, t, i, s = undefined, a = undefined, o = undefined) {
    if (this.Mad.has(e.Entity.Id) && (n = this.Mad.get(e.Entity.Id), this.ClearAndStopMontage(n), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("NPC", 42, "[NpcMontage] 当前正在播放该蒙太奇动画,停止当前动画", ["EntityId", e.Actor.EntityId], ["PlayMontageUid", n]);
    }
    var n = this.yad();
    const h = new PlayingMontageInfo(e, n, t, i, s, a, o);
    this.G2r.set(n, h);
    this.Mad.set(e.Entity.Id, n);
    if (ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, (t, i) => {
      if (t?.IsValid() && h.CheckPlayCondition()) {
        t = (h.BodyMontage = t).SequenceLength * SECOND_TO_MILLISECOND;
        if (h.MontageConfig.PlayMontageTime === 0) {
          h.MontageConfig.CalculatePlayTime(t);
        } else {
          h.MontageConfig.OncePlayTime = t;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 42, "[NpcMontage] 开始播放蒙太奇动画", ["Uid", h.Uid], ["EntityId", e.Actor.EntityId], ["无限循环", h.MontageConfig.IsInfiniteLoop], ["剩余时间", h.MontageConfig.PlayMontageTime], ["MontagePath", h.MontagePath]);
        }
        h.PlayMontageLoop(this.O2r);
      }
    }) !== ResourceSystem_1.ResourceSystem.InvalidId) {
      return n;
    } else {
      return -1;
    }
  }
  static ClearAndStopMontage(t, i, e = 0) {
    if (this.G2r.has(t) && (t = this.G2r.get(t))) {
      if (t.BodyMontage?.IsValid()) {
        this.ForceStop(i, e, t.BodyMontage);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("NPC", 42, "[NpcMontage] 直接混出结束蒙太奇", ["Uid", t.Uid], ["EntityId", t.EntityId], ["MontagePath", t.MontagePath]);
      }
      this.Ead(t);
    }
  }
  static ClearAndEndMontage(t, i = true, e) {
    var s;
    if (this.G2r.has(t) && (t = this.G2r.get(t))) {
      if (s = t.AnimComp) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 42, "[NpcMontage] 结束蒙太奇", ["Uid", t.Uid], ["EntityId", s.Actor.EntityId], ["MontagePath", t.MontagePath]);
        }
        this.O2r(s, t, i, e);
      } else {
        this.Ead(t);
      }
    }
  }
  static Ead(t) {
    if (t && (t.OnClearInfo(), this.Mad.delete(t.EntityId), this.G2r.delete(t.Uid), this.Tmd.has(t.Uid) && (t.AnimComp && (t.AnimComp.EnableLowerBlend = false), this.Tmd.delete(t.Uid)), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("NPC", 42, "[NpcMontage] 结束蒙太奇 RemoveMontageInfo", ["Uid", t.Uid]);
    }
  }
  static IsMontagePlaying(t) {
    return t.MainAnimInstance?.IsAnyMontagePlaying() ?? false;
  }
  static LoadAsync(t, i) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, i);
  }
  static Play(t, i, e) {
    t.MainAnimInstance?.Montage_Play(i, undefined, undefined, undefined, false);
    if (e) {
      t.MainAnimInstance?.OnMontageEnded.Add(e);
    }
  }
  static PlayOnce(t, i, e) {
    t.MainAnimInstance?.Montage_Play(i, undefined, undefined, undefined, false);
    t.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, i);
    if (e) {
      t.MainAnimInstance?.OnMontageEnded.Add(e);
    }
  }
  static PlayFromLoop(t, i, e) {
    t.MainAnimInstance?.Montage_Play(i);
    t.MainAnimInstance?.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, i);
    if (e) {
      t.MainAnimInstance?.OnMontageEnded.Add(e);
    }
  }
  static PlayFromEnd(t, i, e) {
    t.MainAnimInstance?.Montage_Play(i);
    t.MainAnimInstance?.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, i);
    if (e) {
      t.MainAnimInstance?.OnMontageEnded.Add(e);
    }
  }
  static Stop(t, i = false, e) {
    if (i) {
      t.MainAnimInstance?.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
    } else {
      t.MainAnimInstance?.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
    }
  }
  static StopMontage(t, i = 0) {
    t.MainAnimInstance?.Montage_Stop(i);
  }
  static ForceStop(t, i, e) {
    t?.MainAnimInstance?.Montage_Stop(i ?? 0, e);
  }
  static ForceStopWithBlendOut(t, i, e) {
    var s;
    if (t.MainAnimInstance) {
      s = t.MainAnimInstance.Montage_GetPosition(e);
      if ((i = i * 1000) < (s = e.SequenceLength - s)) {
        t.MainAnimInstance.Montage_SetPlayRate(e, s / i);
      }
      t.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
    }
  }
  static AddOnMontageEnded(t, i) {
    if (i) {
      t.MainAnimInstance?.OnMontageEnded.Add(i);
    }
  }
  static RemoveOnMontageEnded(t, i) {
    if (i) {
      t.MainAnimInstance?.OnMontageEnded.Remove(i);
    }
  }
  static ClearOnMontageEnded(t) {
    if (t.MainAnimInstance?.OnMontageEnded) {
      t.MainAnimInstance?.OnMontageEnded.Clear();
    }
  }
  static GetCurrentSection(t) {
    return t.MainAnimInstance?.Montage_GetCurrentSection() ?? FNameUtil_1.FNameUtil.EMPTY;
  }
  static PlayMontageByName(t, i, e) {
    return !!t.GetMontageResPathByName(i)?.includes("/") && this.LoadAsync(i, e) !== ResourceSystem_1.ResourceSystem.InvalidId;
  }
}
exports.PlayMontageUtils = PlayMontageUtils;
(_a = PlayMontageUtils).Sad = 0;
PlayMontageUtils.G2r = new Map();
PlayMontageUtils.Mad = new Map();
PlayMontageUtils.Tmd = new Set();
PlayMontageUtils.O2r = (e, s, t, a) => {
  const o = (t, i) => {
    if (t === s.BodyMontage) {
      _a.RemoveOnMontageEnded(e, o);
      _a.Ead(s);
      a?.(t, i);
    }
  };
  if (s.BodyMontage?.IsValid() && e.MainAnimInstance.Montage_IsPlaying(s.BodyMontage) && !_a.GetCurrentSection(e).op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
    _a.AddOnMontageEnded(e, o);
    _a.Stop(e, t, s.BodyMontage);
  } else {
    _a.ForceStop(e, 0.5, s.BodyMontage);
    _a.Ead(s);
  }
};
class PlayMontageConfig {
  constructor(t = 0, i = 0, e = false, s = false) {
    this.PlayMontageTime = 0;
    this.OncePlayTime = 0;
    this.IsInfiniteLoop = false;
    this.IsPlayLoop = false;
    this.NTe = 0;
    this.OTe = 0;
    this.OTe = t;
    this.NTe = i;
    this.IsPlayLoop = e || this.NTe !== 0;
    this.IsInfiniteLoop = s || this.NTe < 0 || this.OTe < 0;
  }
  CalculatePlayTime(t) {
    this.OncePlayTime = t;
    this.PlayMontageTime = this.NTe && this.NTe > 0 ? this.NTe * SECOND_TO_MILLISECOND : this.OTe && this.OTe > 0 ? this.OTe * t : t;
    if (!this.IsInfiniteLoop) {
      if (this.PlayMontageTime < TimerSystem_1.MIN_TIME) {
        this.PlayMontageTime = Math.max(t, TimerSystem_1.MIN_TIME);
      }
      if (this.PlayMontageTime > TimerSystem_1.MAX_TIME) {
        this.IsInfiniteLoop = true;
      }
    }
  }
}
exports.PlayMontageConfig = PlayMontageConfig;
class PlayingMontageInfo {
  constructor(t, i, e, s, a = undefined, o = undefined, n = undefined) {
    this.Uid = 0;
    this.EntityId = 0;
    this.MontagePath = "";
    this.MontageConfig = undefined;
    this.AnimComp = undefined;
    this.BodyMontage = undefined;
    this.TimerHandle = undefined;
    this.TYo = undefined;
    this.LYo = undefined;
    this.DYo = undefined;
    this.EntityId = t.Entity.Id;
    this.AnimComp = t;
    this.Uid = i;
    this.MontagePath = e;
    this.MontageConfig = s;
    this.LYo = a;
    this.DYo = o;
    this.TYo = n;
  }
  CheckPlayCondition() {
    return !this.TYo || this.TYo(this);
  }
  OnClearInfo() {
    if (this.DYo) {
      this.DYo(this);
    }
    if (this.TimerHandle && TimerSystem_1.TimerSystem.Has(this.TimerHandle)) {
      TimerSystem_1.TimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
    this.MontageConfig = undefined;
    this.LYo = undefined;
    this.DYo = undefined;
    this.TYo = undefined;
  }
  PlayMontageLoop(t) {
    if (this.LYo) {
      this.LYo(this);
    }
    this.UYo(t);
  }
  UYo(i) {
    if (this.AnimComp?.Valid) {
      if (this.MontageConfig.IsInfiniteLoop && this.MontageConfig.IsPlayLoop) {
        PlayMontageUtils.Play(this.AnimComp, this.BodyMontage);
      } else {
        let t = 0;
        if (this.MontageConfig.IsPlayLoop) {
          t = this.MontageConfig.PlayMontageTime;
          PlayMontageUtils.Play(this.AnimComp, this.BodyMontage);
        } else {
          t = this.MontageConfig.OncePlayTime;
          PlayMontageUtils.PlayOnce(this.AnimComp, this.BodyMontage);
        }
        this.MontageConfig.PlayMontageTime = this.MontageConfig.PlayMontageTime - t;
        if (!this.MontageConfig.IsInfiniteLoop && this.MontageConfig.PlayMontageTime <= TimerSystem_1.MIN_TIME) {
          this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
            this.TimerHandle = undefined;
            if (this.AnimComp?.Valid) {
              i(this.AnimComp, this);
            }
          }, t);
        } else {
          this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
            this.TimerHandle = undefined;
            this.PlayMontageLoop(i);
          }, t);
        }
      }
    }
  }
}
exports.PlayingMontageInfo = PlayingMontageInfo;
//# sourceMappingURL=PlayMontageUtils.js.map