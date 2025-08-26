"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataBase = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataBase {
  constructor(t) {
    this.$Vo = undefined;
    this.YVo = undefined;
    this.JVo = undefined;
    this.lGl = false;
    this.hGl = undefined;
    this.zVo = undefined;
    this.ZVo = undefined;
    this.e6o = undefined;
    this.t6o = undefined;
    this.i6o = undefined;
    this.o6o = undefined;
    this.r6o = undefined;
    this.n6 = undefined;
    this.IsOversizeForTrace = false;
    this.kJ = undefined;
    this.n6o = undefined;
    this.s6o = 0;
    this.a6o = false;
    this.h6o = undefined;
    this.l6o = false;
    this._6o = "";
    this.BulletCamp = undefined;
    this.u6o = undefined;
    this.c6o = undefined;
    this.m6o = undefined;
    this.d6o = 0;
    this.C6o = false;
    this.g6o = undefined;
    this.f6o = undefined;
    this.p6o = false;
    this.v6o = undefined;
    this.M6o = false;
    this._Gl = undefined;
    this.uGl = false;
    this.E6o = undefined;
    this.S6o = undefined;
    this.y6o = undefined;
    this.I6o = undefined;
    this.T6o = false;
    this.L6o = undefined;
    this.Huc = undefined;
    this.D6o = undefined;
    this.R6o = undefined;
    this.Ptc = undefined;
    this.U6o = undefined;
    this.A6o = undefined;
    this.P6o = undefined;
    this.x6o = undefined;
    this.w6o = undefined;
    this.B6o = undefined;
    this.b6o = false;
    this.cGl = undefined;
    this.mGl = false;
    this.q6o = undefined;
    this.G6o = 0;
    this.N6o = false;
    this.O6o = undefined;
    this.iSa = undefined;
    this.HitActorTypeInternal = undefined;
    this._au = undefined;
    this.Pe = t;
  }
  get IgnoreGradient() {
    if (this.$Vo === undefined) {
      this.$Vo = this.Pe.不适配坡度;
    }
    return this.$Vo;
  }
  get CenterOffset() {
    this.YVo ||= Vector_1.Vector.Create(this.Pe.中心位置偏移);
    return this.YVo;
  }
  get DamageId() {
    if (this.JVo === undefined) {
      this.JVo = Number(this.Pe.伤害ID);
    }
    return this.JVo;
  }
  get MultiDamageId() {
    if (!this.lGl) {
      this.lGl = true;
      var i = this.Pe.多伤害ID;
      var s = i.Num();
      if (s > 0) {
        this.hGl = new Array();
      }
      for (let t = 0; t < s; t++) {
        var h = i.Get(t);
        this.hGl.push(Number(h));
      }
    }
    return this.hGl;
  }
  get EnablePartHitAudio() {
    if (this.zVo === undefined) {
      this.zVo = this.Pe.是否响应材质受击音效;
    }
    return this.zVo;
  }
  get IntervalAfterHit() {
    if (this.ZVo === undefined) {
      this.ZVo = this.Pe.作用间隔基于个体;
    }
    return this.ZVo;
  }
  get Interval() {
    if (this.e6o === undefined) {
      this.e6o = this.Pe.作用间隔;
    }
    return this.e6o;
  }
  get ShareCounter() {
    if (this.t6o === undefined) {
      this.t6o = this.Pe.共享父子弹次数;
    }
    return this.t6o;
  }
  get BornPosition() {
    this.i6o ||= Vector_1.Vector.Create(this.Pe.出生位置偏移);
    return this.i6o;
  }
  get BornPositionStandard() {
    if (this.o6o === undefined) {
      this.o6o = this.Pe.出生位置基准;
    }
    return this.o6o;
  }
  get BornPositionRandom() {
    this.r6o ||= Vector_1.Vector.Create(this.Pe.出生位置随机);
    return this.r6o;
  }
  get Size() {
    this.n6 ||= Vector_1.Vector.Create(this.Pe.初始大小);
    return this.n6;
  }
  get Rotator() {
    this.kJ ||= Rotator_1.Rotator.Create(this.Pe.初始旋转);
    return this.kJ;
  }
  get VictimCount() {
    if (this.n6o === undefined) {
      this.n6o = this.Pe.命中个数;
    }
    return this.n6o;
  }
  get HitConditionTagId() {
    this.k6o();
    return this.s6o;
  }
  k6o() {
    var t;
    if (!this.a6o) {
      this.a6o = true;
      if ((t = this.Pe.命中判定Tag)?.TagName !== StringUtils_1.NONE_STRING) {
        this.s6o = t.TagId;
      } else {
        this.s6o = 0;
      }
    }
  }
  get HitType() {
    if (this.h6o === undefined) {
      this.h6o = this.Pe.命中判定类型;
    }
    return this.h6o;
  }
  get DaHitTypePreset() {
    this.F6o();
    return this._6o;
  }
  F6o() {
    var t;
    if (!this.l6o) {
      this.l6o = true;
      this._6o = this.Pe.命中判定类型预设.ToAssetPathName();
      if (this._6o?.length > 0) {
        t = ResourceSystem_1.ResourceSystem.Load(this._6o, UE.BulletCampType_C);
        this.BulletCamp = t?.阵营;
      }
    }
  }
  get RelativeDirection() {
    if (this.u6o === undefined) {
      this.u6o = this.Pe.子弹受击方向;
    }
    return this.u6o;
  }
  get Shape() {
    if (this.c6o === undefined) {
      this.c6o = this.Pe.子弹形状;
    }
    return this.c6o;
  }
  get AttackDirection() {
    this.m6o ||= Rotator_1.Rotator.Create(this.Pe.子弹攻击方向);
    return this.m6o;
  }
  get TagId() {
    this.V6o();
    return this.d6o;
  }
  V6o() {
    var t;
    if (!this.C6o) {
      this.C6o = true;
      if ((t = this.Pe.子弹标签)?.TagName !== StringUtils_1.NONE_STRING) {
        this.d6o = t.TagId;
      } else {
        this.d6o = 0;
      }
    }
  }
  get BornRequireTagIds() {
    this.H6o();
    return this.g6o;
  }
  get BornForbidTagIds() {
    this.H6o();
    return this.f6o;
  }
  H6o() {
    if (!this.p6o) {
      this.p6o = true;
      var t = this.Pe.子弹禁止生成Tag;
      if (t) {
        var i = t.GameplayTags;
        var s = i.Num();
        if (s > 0) {
          this.f6o = [];
          for (let t = 0; t < s; t++) {
            var h = i.Get(t);
            if (h?.TagId) {
              this.f6o.push(h.TagId);
            }
          }
        }
      }
      t = this.Pe.子弹允许生成Tag;
      if (t) {
        var e = t.GameplayTags;
        var r = e.Num();
        if (r > 0) {
          this.g6o = [];
          for (let t = 0; t < r; t++) {
            var o = e.Get(t);
            if (o?.TagId) {
              this.g6o.push(o.TagId);
            }
          }
        }
      }
    }
  }
  get HitEffectWeakness() {
    if (!this.M6o) {
      this.M6o = true;
      this.v6o = this.Pe.弱点被击效果;
    }
    return this.v6o;
  }
  get MultiHitEffectWeakness() {
    if (!this.uGl) {
      this.uGl = true;
      var i = this.Pe.多弱点被击效果;
      var s = i.Num();
      if (s > 0) {
        this._Gl = new Array();
        for (let t = 0; t < s; t++) {
          var h = i.Get(t);
          this._Gl.push(h);
        }
      }
    }
    return this._Gl;
  }
  get HitCountMax() {
    if (this.E6o === undefined) {
      this.E6o = this.Pe.总作用次数限制;
    }
    return this.E6o;
  }
  get DestroyOnSkillEnd() {
    if (this.S6o === undefined) {
      this.S6o = this.Pe.技能结束是否销毁子弹;
    }
    return this.S6o;
  }
  get Duration() {
    if (this.y6o === undefined) {
      this.y6o = this.Pe.持续时间;
    }
    return this.y6o;
  }
  get BlackboardKey() {
    if (!this.T6o) {
      this.T6o = true;
      this.I6o = this.Pe.攻击者黑板Key值;
    }
    return this.I6o;
  }
  get ContinuesCollision() {
    if (this.L6o === undefined) {
      this.L6o = this.Pe.是否持续碰撞;
    }
    return this.L6o;
  }
  get StickGround() {
    if (this.R6o === undefined) {
      this.R6o = this.Pe.是否贴地子弹;
    }
    return this.R6o;
  }
  get StickWater() {
    if (this.Ptc === undefined) {
      this.Ptc = this.Pe.是否贴水面;
    }
    return this.Ptc;
  }
  get NotFollowMovePlatform() {
    if (this.Huc === undefined) {
      this.Huc = this.Pe.不跟随移动平台;
    }
    return this.Huc;
  }
  get StickTraceLen() {
    if (this.D6o === undefined) {
      this.D6o = this.Pe.贴地探测距离;
    }
    return this.D6o;
  }
  get HitCountPerVictim() {
    if (this.U6o === undefined) {
      this.U6o = this.Pe.每个单位总作用次数;
    }
    return this.U6o;
  }
  get SpecialParams() {
    if (!this.A6o) {
      this.A6o = new Map();
      var i = this.Pe.特殊参数;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.A6o.set(s, i.Get(s));
      }
    }
    return this.A6o;
  }
  get CollisionActiveDelay() {
    if (this.P6o === undefined) {
      this.P6o = this.Pe.碰撞判定延迟;
    }
    return this.P6o;
  }
  get CollisionActiveDuration() {
    if (this.x6o === undefined) {
      this.x6o = this.Pe.碰撞判定时长;
    }
    return this.x6o;
  }
  get SyncType() {
    if (this.w6o === undefined) {
      this.w6o = this.Pe.网络同步类型;
    }
    return this.w6o;
  }
  get BeHitEffect() {
    if (!this.b6o) {
      this.b6o = true;
      this.B6o = this.Pe.被击效果;
    }
    return this.B6o;
  }
  get MultiBeHitEffect() {
    if (!this.mGl) {
      this.mGl = true;
      var i = this.Pe.多被击效果;
      var s = i.Num();
      if (s > 0) {
        this.cGl = new Array();
        for (let t = 0; t < s; t++) {
          var h = i.Get(t);
          this.cGl.push(h);
        }
      }
    }
    return this.cGl;
  }
  get BornDistLimit() {
    this.q6o ||= Vector_1.Vector.Create(this.Pe.限制生成距离);
    return this.q6o;
  }
  get BanHitTagId() {
    this.j6o();
    return this.G6o;
  }
  j6o() {
    var t;
    if (!this.N6o) {
      this.N6o = true;
      if ((t = this.Pe.禁止命中Tag)?.TagName !== StringUtils_1.NONE_STRING) {
        this.G6o = t.TagId;
      } else {
        this.G6o = 0;
      }
    }
  }
  get DebugShowProgress() {
    if (this.O6o === undefined) {
      this.O6o = this.Pe.Debug显示子弹进度;
    }
    return this.O6o;
  }
  get BigRangeHitSceneItem() {
    if (this.iSa === undefined) {
      this.iSa = this.Pe.大范围子弹对场景物件生效;
    }
    return this.iSa;
  }
  get HitActorType() {
    if (this.HitActorTypeInternal === undefined) {
      this.HitActorTypeInternal = this.Pe.命中实体类型;
    }
    return this.HitActorTypeInternal;
  }
  get BigRangeSearchType() {
    if (this._au === undefined) {
      this._au = this.Pe.大范围子弹检测方式;
    }
    return this._au;
  }
  Preload() {
    this.F6o();
    this.H6o();
    this.k6o();
    this.j6o();
    this.CenterOffset;
    this.Interval;
    this.ShareCounter;
    this.BornPosition;
    this.BornPositionStandard;
    this.BornPositionRandom;
    this.Size;
    this.Rotator;
    this.HitType;
    this.Shape;
    this.TagId;
    this.Duration;
    this.CollisionActiveDelay;
    this.CollisionActiveDuration;
    this.SyncType;
    this.BornDistLimit;
    this.HitActorType;
    return true;
  }
}
exports.BulletDataBase = BulletDataBase;
//# sourceMappingURL=BulletDataBase.js.map