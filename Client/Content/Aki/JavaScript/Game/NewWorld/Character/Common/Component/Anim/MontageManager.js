"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MontageManager = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines"),
  MONTAGE_BLEND_TIME = .5,
  LOADING_ID = -2;
class MontageManager {
  constructor() {
    this.hJ = 1, this.oRe = void 0, this.sDe = void 0, this.j7l = ResourceSystem_1.ResourceSystem.InvalidId, this.r1t = 0, this.uG1 = void 0, this.nj_ = void 0, this.ej_ = void 0, this.sj_ = void 0, this.aj_ = void 0, this.hj_ = !1, this.zN1 = void 0, this.lj_ = new Queue_1.Queue, this._j_ = (t, e) => {
      this.cj_.Montage_IsActive(t) || t === this.sj_ && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体播放蒙太奇结束", ["pbDataId", this.sDe.PbDataId], ["handle", this.hJ], ["bInterrupted", e], ["path", this.aj_]), this.cj_.OnMontageEnded.Remove(this._j_.bind(this)), this.uj_(e))
    }
  }
  get cj_() {
    return this.oRe.MainAnimInstance
  }
  Init(t) {
    this.oRe = t, this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Entity.Id)
  }
  ClearObject() {
    return this.Clear(), !0
  }
  Clear() {
    this.oRe = void 0, this.sDe = void 0, this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l), this.j7l = ResourceSystem_1.ResourceSystem.InvalidId, this.r1t = 0, this.sj_ = void 0, this.aj_ = void 0, this.nj_ = void 0, this.ej_ = void 0, this.lj_.Clear()
  }
  IsMontagePlaying(t) {
    return void 0 !== t ? this.hJ === t : this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId || ObjectUtils_1.ObjectUtils.IsValid(this.sj_)
  }
  PlayMontage(a) {
    if (this.hj_) return Log_1.Log.CheckError() && Log_1.Log.Error("BasePerform", 26, "[Montage] 播放蒙太奇嵌套"), -1;
    this.hj_ = !0;
    let r = void 0,
      o = void 0;
    this.sj_ && (a.MontagePath !== this.aj_ && a.MontageAsset !== this.sj_ || (t = this.cj_.Montage_GetCurrentSection(this.sj_), o = this.sj_, a.InSectionToStartMontageAt ? t.op_Equality(a.InSectionToStartMontageAt) && (r = this.cj_.Montage_GetPosition(this.sj_)) : t.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION) || (r = this.cj_.Montage_GetPosition(this.sj_))), this.zN1 = this.sj_), this.uj_();
    const n = this.hJ;
    if (a.OnStartCallback?.(n), this.ej_ = a.OnEndCallback, this.nj_ = a.OnPlayCallback, StringUtils_1.StringUtils.IsEmpty(a.MontagePath) && !ObjectUtils_1.ObjectUtils.IsValid(a.MontageAsset)) {
      for (Log_1.Log.CheckError() && Log_1.Log.Error("BasePerform", 26, "[Montage] 实体播放蒙太奇路径和资产都为空", ["pbDataId", this.sDe.PbDataId]), this.uj_(), this.hj_ = !1; !this.lj_.Empty;) this.lj_.Pop()?.();
      return -1
    }
    this.aj_ = a.MontagePath ?? UE.KismetSystemLibrary.GetPathName(a.MontageAsset);
    var t = t => {
      if (this.j7l = ResourceSystem_1.ResourceSystem.InvalidId, this.zN1 && this.cj_.Montage_Stop(MONTAGE_BLEND_TIME, this.zN1), t && ObjectUtils_1.ObjectUtils.IsValid(t) && this.dj_(t)) {
        this.sj_ = t;
        let e = r;
        if (void 0 === e && a.InSectionToStartMontageAt) {
          var i = t.CompositeSections,
            s = i.Num();
          for (let t = 0; t < s; t++) {
            var h = i.Get(t);
            if (h.SectionName.op_Equality(a.InSectionToStartMontageAt)) {
              e = h.SegmentBeginTime;
              break
            }
          }
          void 0 === e && Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] PlayMontage找不到片段", ["montage", t.GetName()], ["section", a.InSectionToStartMontageAt])
        }
        this.cj_.Montage_Play(this.sj_, void 0, void 0, e, !a.KeepOtherMontage), Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体播放蒙太奇", ["pbDataId", this.sDe.PbDataId], ["handle", n], ["startTime", e], ["isLoop", a.IsLoop], ["path", this.aj_]), this.mj_(a.Duration), this.fj_(a.IsLoop), o || this.cj_.OnMontageEnded.Add(this._j_.bind(this)), this.nj_?.(this.sj_)
      } else this.uj_()
    };
    for (a.MontageAsset || o ? t(a.MontageAsset ?? o) : (this.j7l = LOADING_ID, t = ResourceSystem_1.ResourceSystem.LoadAsync(a.MontagePath, UE.AnimMontage, t), this.j7l === LOADING_ID && (this.j7l = t)), this.hj_ = !1; !this.lj_.Empty;) this.lj_.Pop()?.();
    return n === this.hJ ? n : -1
  }
  StopMontage(t) {
    if ((void 0 === t.HandleId || this.hJ === t.HandleId) && this.aj_) {
      if (t.Montage) {
        if (this.sj_ !== t.Montage) return;
        if (UE.KismetSystemLibrary.GetPathName(t.Montage) !== this.aj_) return
      }
      var e = t.Delay ?? 0;
      if (0 < e) this.mj_(e, t.Method, e);
      else if (this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId) this.uj_();
      else {
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体停止蒙太奇", ["id", this.sDe.PbDataId], ["handle", this.hJ], ["method", t.Method], ["path", this.aj_]);
        var s = this.sj_.CompositeSections,
          h = s.Num();
        let e = !1,
          i = !1;
        for (let t = 0; t < h; t++) {
          var a = s.Get(t);
          !i && a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME) && (i = !0), !e && a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION) && (e = !0)
        }
        var r, o = t.BlendOutTime ?? MONTAGE_BLEND_TIME;
        switch (t.Method ?? 0) {
          case 0:
            this.cj_.Montage_Stop(o, this.sj_);
            break;
          case 1:
            e ? (this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.START_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_), this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_)) : i ? this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION, this.sj_) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇既没有Default也没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]), this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 4:
            e ? this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]), this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 2:
            e ? this.cj_.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]), this.cj_.Montage_Stop(o, this.sj_));
            break;
          case 3:
            e ? (r = this.cj_.Montage_GetPosition(this.sj_), o < (r = this.sj_.SequenceLength - r) && this.cj_.Montage_SetPlayRate(this.sj_, r / o), this.oRe.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]), this.cj_.Montage_Stop(o, this.sj_))
        }
        t.ImmediatelyCallback && this.uj_()
      }
    }
  }
  ClearCallback(t) {
    void 0 !== t && this.hJ !== t || (this.nj_ = void 0, this.ej_ = void 0)
  }
  mj_(t = 0, e = 2, i) {
    this.uG1 = {
      Method: e,
      BlendOutTime: i
    }, this.r1t = t
  }
  fj_(t) {
    if (void 0 !== t) {
      let e = !1,
        i = !1;
      for (let t = 0; t < this.sj_.CompositeSections.Num(); t++) {
        var s = this.sj_.CompositeSections.Get(t);
        if (s.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION)) {
          e = !0;
          break
        }
        if (s.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME)) {
          i = !0;
          break
        }
      }
      e || i ? t ? e ? this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, this.sj_) : i && this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, this.sj_) : e ? this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_) : i && this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION, this.sj_) : Log_1.Log.CheckError() && Log_1.Log.Error("BasePerform", 26, "[Montage] 蒙太奇片段不合法", ["montage", this.sj_.GetName()], ["pbDataId", this.sDe.PbDataId])
    }
  }
  uj_(t = !0) {
    const e = this.hJ,
      i = (this.hJ++, this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l), this.sj_),
      s = (this.j7l = ResourceSystem_1.ResourceSystem.InvalidId, this.r1t = 0, this.sj_ = void 0, this.aj_ = void 0, this.nj_),
      h = this.ej_;
    this.nj_ = void 0, this.ej_ = void 0, i || (this.hj_ ? this.lj_.Push(() => {
      s?.(void 0)
    }) : s?.(void 0)), this.hj_ ? this.lj_.Push(() => {
      h?.(i, t), EventSystem_1.EventSystem.EmitWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, e)
    }) : (h?.(i, t), EventSystem_1.EventSystem.EmitWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, e))
  }
  dj_(e) {
    var i = e.SlotAnimTracks,
      s = i.Num();
    for (let t = 0; t < s; t++)
      if (!i.Get(t).SlotName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT)) return Log_1.Log.CheckError() && Log_1.Log.Error("BasePerform", 26, "[Montage] 非DefaultSlot蒙太奇", ["montage", e.GetName()], ["pbDataId", this.sDe.PbDataId]), !1;
    return !0
  }
  OnTick(t) {
    this.r1t <= 0 || (this.r1t -= t, this.r1t <= 0 && (this.StopMontage(this.uG1), this.uG1 = void 0, this.r1t = 0))
  }
  GetRemainDuration(t) {
    return this.hJ !== t ? 0 : this.r1t
  }
}
exports.MontageManager = MontageManager;
//# sourceMappingURL=MontageManager.js.map