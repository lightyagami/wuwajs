"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MontageManager = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const MONTAGE_BLEND_TIME = 0.5;
const LOADING_ID = -2;
class MontageManager {
  constructor() {
    this.hJ = 1;
    this.oRe = undefined;
    this.sDe = undefined;
    this.j7l = ResourceSystem_1.ResourceSystem.InvalidId;
    this.r1t = 0;
    this.VG1 = undefined;
    this.nj_ = undefined;
    this.ej_ = undefined;
    this.sj_ = undefined;
    this.aj_ = undefined;
    this.hj_ = false;
    this.w31 = undefined;
    this.lj_ = new Queue_1.Queue();
    this._j_ = (t, e) => {
      if (!this.cj_.Montage_IsActive(t)) {
        if (t === this.sj_) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体播放蒙太奇结束", ["pbDataId", this.sDe.PbDataId], ["handle", this.hJ], ["bInterrupted", e], ["path", this.aj_]);
          }
          this.cj_.OnMontageEnded.Remove(this._j_.bind(this));
          this.uj_(e);
        }
      }
    };
  }
  get cj_() {
    return this.oRe.MainAnimInstance;
  }
  Init(t) {
    this.oRe = t;
    this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Entity.Id);
  }
  ClearObject() {
    this.Clear();
    return true;
  }
  Clear() {
    this.oRe = undefined;
    this.sDe = undefined;
    if (this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l);
    }
    this.j7l = ResourceSystem_1.ResourceSystem.InvalidId;
    this.r1t = 0;
    this.sj_ = undefined;
    this.aj_ = undefined;
    this.nj_ = undefined;
    this.ej_ = undefined;
    this.lj_.Clear();
  }
  IsMontagePlaying(t) {
    if (t !== undefined) {
      return this.hJ === t;
    } else {
      return this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId || ObjectUtils_1.ObjectUtils.IsValid(this.sj_);
    }
  }
  PlayMontage(a) {
    if (this.hj_) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BasePerform", 26, "[Montage] 播放蒙太奇嵌套");
      }
      return -1;
    }
    this.hj_ = true;
    let r = undefined;
    let o = undefined;
    if (this.sj_) {
      if (a.MontagePath === this.aj_ || a.MontageAsset === this.sj_) {
        t = this.cj_.Montage_GetCurrentSection(this.sj_);
        o = this.sj_;
        if (a.InSectionToStartMontageAt) {
          if (t.op_Equality(a.InSectionToStartMontageAt)) {
            r = this.cj_.Montage_GetPosition(this.sj_);
          }
        } else if (!t.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
          r = this.cj_.Montage_GetPosition(this.sj_);
        }
      }
      this.w31 = this.sj_;
    }
    this.uj_();
    const n = this.hJ;
    a.OnStartCallback?.(n);
    this.ej_ = a.OnEndCallback;
    this.nj_ = a.OnPlayCallback;
    if (StringUtils_1.StringUtils.IsEmpty(a.MontagePath) && !ObjectUtils_1.ObjectUtils.IsValid(a.MontageAsset)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BasePerform", 26, "[Montage] 实体播放蒙太奇路径和资产都为空", ["pbDataId", this.sDe.PbDataId]);
      }
      this.uj_();
      this.hj_ = false;
      while (!this.lj_.Empty) {
        this.lj_.Pop()?.();
      }
      return -1;
    }
    this.aj_ = a.MontagePath ?? UE.KismetSystemLibrary.GetPathName(a.MontageAsset);
    var t = t => {
      this.j7l = ResourceSystem_1.ResourceSystem.InvalidId;
      if (this.w31) {
        this.cj_.Montage_Stop(MONTAGE_BLEND_TIME, this.w31);
      }
      if (t && ObjectUtils_1.ObjectUtils.IsValid(t) && this.dj_(t)) {
        this.sj_ = t;
        let e = r;
        if (e === undefined && a.InSectionToStartMontageAt) {
          var i = t.CompositeSections;
          var s = i.Num();
          for (let t = 0; t < s; t++) {
            var h = i.Get(t);
            if (h.SectionName.op_Equality(a.InSectionToStartMontageAt)) {
              e = h.SegmentBeginTime;
              break;
            }
          }
          if (e === undefined && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("BasePerform", 26, "[Montage] PlayMontage找不到片段", ["montage", t.GetName()], ["section", a.InSectionToStartMontageAt]);
          }
        }
        this.cj_.Montage_Play(this.sj_, undefined, undefined, e, !a.KeepOtherMontage);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体播放蒙太奇", ["pbDataId", this.sDe.PbDataId], ["handle", n], ["startTime", e], ["isLoop", a.IsLoop], ["path", this.aj_]);
        }
        this.mj_(a.Duration);
        this.fj_(a.IsLoop);
        if (!o) {
          this.cj_.OnMontageEnded.Add(this._j_.bind(this));
        }
        this.nj_?.(this.sj_);
      } else {
        this.uj_();
      }
    };
    if (a.MontageAsset || o) {
      t(a.MontageAsset ?? o);
    } else {
      this.j7l = LOADING_ID;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(a.MontagePath, UE.AnimMontage, t);
      if (this.j7l === LOADING_ID) {
        this.j7l = t;
      }
    }
    this.hj_ = false;
    while (!this.lj_.Empty) {
      this.lj_.Pop()?.();
    }
    if (n === this.hJ) {
      return n;
    } else {
      return -1;
    }
  }
  StopMontage(t) {
    if ((t.HandleId === undefined || this.hJ === t.HandleId) && this.aj_) {
      if (t.Montage) {
        if (this.sj_ !== t.Montage) {
          return;
        }
        if (UE.KismetSystemLibrary.GetPathName(t.Montage) !== this.aj_) {
          return;
        }
      }
      var e = t.Delay ?? 0;
      if (e > 0) {
        this.mj_(e, t.Method, e);
      } else if (this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId) {
        this.uj_();
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BasePerform", 26, "[Montage] 实体停止蒙太奇", ["id", this.sDe.PbDataId], ["handle", this.hJ], ["method", t.Method], ["path", this.aj_]);
        }
        var s = this.sj_.CompositeSections;
        var h = s.Num();
        let e = false;
        let i = false;
        for (let t = 0; t < h; t++) {
          var a = s.Get(t);
          if (!i && a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME)) {
            i = true;
          }
          if (!e && a.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
            e = true;
          }
        }
        var r;
        var o = t.BlendOutTime ?? MONTAGE_BLEND_TIME;
        switch (t.Method ?? 0) {
          case 0:
            this.cj_.Montage_Stop(o, this.sj_);
            break;
          case 1:
            if (e) {
              this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.START_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
              this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
            } else if (i) {
              this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION, this.sj_);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇既没有Default也没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]);
              }
              this.cj_.Montage_Stop(o, this.sj_);
            }
            break;
          case 4:
            if (e) {
              this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]);
              }
              this.cj_.Montage_Stop(o, this.sj_);
            }
            break;
          case 2:
            if (e) {
              this.cj_.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]);
              }
              this.cj_.Montage_Stop(o, this.sj_);
            }
            break;
          case 3:
            if (e) {
              r = this.cj_.Montage_GetPosition(this.sj_);
              if (o < (r = this.sj_.SequenceLength - r)) {
                this.cj_.Montage_SetPlayRate(this.sj_, r / o);
              }
              this.oRe.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("BasePerform", 26, "[Montage] 蒙太奇没有End片段，直接混出", ["pbDataId", this.sDe.PbDataId], ["path", this.aj_]);
              }
              this.cj_.Montage_Stop(o, this.sj_);
            }
        }
        if (t.ImmediatelyCallback) {
          this.uj_();
        }
      }
    }
  }
  ClearCallback(t) {
    if (t === undefined || this.hJ === t) {
      this.nj_ = undefined;
      this.ej_ = undefined;
    }
  }
  mj_(t = 0, e = 2, i) {
    this.VG1 = {
      Method: e,
      BlendOutTime: i
    };
    this.r1t = t;
  }
  fj_(t) {
    if (t !== undefined) {
      let e = false;
      let i = false;
      for (let t = 0; t < this.sj_.CompositeSections.Num(); t++) {
        var s = this.sj_.CompositeSections.Get(t);
        if (s.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION)) {
          e = true;
          break;
        }
        if (s.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME)) {
          i = true;
          break;
        }
      }
      if (e || i) {
        if (t) {
          if (e) {
            this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, this.sj_);
          } else if (i) {
            this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, this.sj_);
          }
        } else if (e) {
          this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, this.sj_);
        } else if (i) {
          this.cj_.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SECTION_NAME, CharacterNameDefines_1.CharacterNameDefines.NULL_SECTION, this.sj_);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BasePerform", 26, "[Montage] 蒙太奇片段不合法", ["montage", this.sj_.GetName()], ["pbDataId", this.sDe.PbDataId]);
      }
    }
  }
  uj_(t = true) {
    const e = this.hJ;
    this.hJ++;
    if (this.j7l !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.j7l);
    }
    const i = this.sj_;
    this.j7l = ResourceSystem_1.ResourceSystem.InvalidId;
    this.r1t = 0;
    this.sj_ = undefined;
    this.aj_ = undefined;
    const s = this.nj_;
    const h = this.ej_;
    this.nj_ = undefined;
    this.ej_ = undefined;
    if (!i) {
      if (this.hj_) {
        this.lj_.Push(() => {
          s?.(undefined);
        });
      } else {
        s?.(undefined);
      }
    }
    if (this.hj_) {
      this.lj_.Push(() => {
        h?.(i, t);
        EventSystem_1.EventSystem.EmitWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, e);
      });
    } else {
      h?.(i, t);
      EventSystem_1.EventSystem.EmitWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, e);
    }
  }
  dj_(e) {
    var i = e.SlotAnimTracks;
    var s = i.Num();
    for (let t = 0; t < s; t++) {
      if (!i.Get(t).SlotName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.DEFAULT_SLOT)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BasePerform", 26, "[Montage] 非DefaultSlot蒙太奇", ["montage", e.GetName()], ["pbDataId", this.sDe.PbDataId]);
        }
        return false;
      }
    }
    return true;
  }
  OnTick(t) {
    if (!(this.r1t <= 0)) {
      this.r1t -= t;
      if (this.r1t <= 0) {
        this.StopMontage(this.VG1);
        this.VG1 = undefined;
        this.r1t = 0;
      }
    }
  }
  GetRemainDuration(t) {
    if (this.hJ !== t) {
      return 0;
    } else {
      return this.r1t;
    }
  }
}
exports.MontageManager = MontageManager;
//# sourceMappingURL=MontageManager.js.map