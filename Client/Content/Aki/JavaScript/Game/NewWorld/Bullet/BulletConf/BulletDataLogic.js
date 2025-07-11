"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataLogic = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CombatLog_1 = require("../../../Utils/CombatLog");
class BulletDataLogic {
  constructor(t) {
    this.Data = undefined;
    this._8o = undefined;
    this.u8o = false;
    this.c8o = undefined;
    this.m8o = undefined;
    this.d8o = undefined;
    this.C8o = undefined;
    this.g8o = false;
    this.f8o = undefined;
    this.p8o = undefined;
    this.xKs = undefined;
    this.v8o = undefined;
    this.M8o = undefined;
    this.vka = undefined;
    this.Mka = undefined;
    this.Zeh = undefined;
    this.E8o = undefined;
    this.S8o = undefined;
    this.y8o = undefined;
    this.I8o = undefined;
    this.T8o = false;
    this.L8o = undefined;
    this.D8o = undefined;
    if (!Info_1.Info.IsBuildDevelopmentOrDebug || t && UE.KismetSystemLibrary.IsValidSoftObjectReference(t)) {
      this.Data = ResourceSystem_1.ResourceSystem.Load(t.ToAssetPathName(), UE.BulletLogicType_C);
      if (Info_1.Info.IsBuildDevelopmentOrDebug && !this.ProfileName.toString().toLowerCase().startsWith("bullet_")) {
        CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置出错，逻辑设置.预设.子弹碰撞预设 填写的值不对", ["配置路径:", t.ToAssetPathName()]);
      }
    } else {
      CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹配置出错，没有配置逻辑设置.预设", ["配置路径:", t.ToAssetPathName()]);
    }
  }
  get ComponentName() {
    if (!this.u8o) {
      this.u8o = true;
      this._8o = this.Data.只碰撞胶囊体;
    }
    return this._8o;
  }
  get HitDirectionType() {
    if (this.c8o === undefined) {
      this.c8o = this.Data.子弹受击类型角度判断;
    }
    return this.c8o;
  }
  get DestroyOnHitCharacter() {
    if (this.m8o === undefined) {
      this.m8o = this.Data.子弹碰撞单位销毁;
    }
    return this.m8o;
  }
  get DestroyOnHitObstacle() {
    if (this.d8o === undefined) {
      this.d8o = this.Data.子弹碰撞障碍销毁;
    }
    return this.d8o;
  }
  get ProfileName() {
    if (!this.g8o) {
      this.g8o = true;
      this.C8o = this.Data.子弹碰撞预设;
    }
    return this.C8o;
  }
  get Type() {
    if (this.f8o === undefined) {
      this.f8o = this.Data.子弹类型;
    }
    return this.f8o;
  }
  get InteractWithWater() {
    if (this.p8o === undefined) {
      this.p8o = this.Data.开启水面交互;
    }
    return this.p8o;
  }
  get InteractWithAirWall() {
    if (this.xKs === undefined) {
      this.xKs = this.Data.开启空气墙交互;
    }
    return this.xKs;
  }
  get ReboundChannel() {
    if (this.v8o === undefined) {
      this.v8o = this.Data.弹反通道;
    }
    return this.v8o;
  }
  get CanCounterAttack() {
    if (this.M8o === undefined) {
      this.M8o = this.Data.是否可以触发拼刀;
    }
    return this.M8o;
  }
  get CounterAttackIgnoreAngle() {
    if (this.vka === undefined) {
      this.vka = this.Data.拼刀忽略角度;
    }
    return this.vka;
  }
  get CounterAttackIgnoreDist() {
    if (this.Mka === undefined) {
      this.Mka = this.Data.拼刀忽略距离;
    }
    return this.Mka;
  }
  get CanBreakWindupAttack() {
    if (this.Zeh === undefined) {
      this.Zeh = this.Data.触发前摇拼刀;
    }
    return this.Zeh;
  }
  get CanVisionCounterAttack() {
    if (this.E8o === undefined) {
      this.E8o = this.Data.是否可以触发对策;
    }
    return this.E8o;
  }
  get CanDodge() {
    if (this.S8o === undefined) {
      this.S8o = this.Data.是否可以触发极限闪避;
    }
    return this.S8o;
  }
  get DestroyOnCountZero() {
    if (this.y8o === undefined) {
      this.y8o = this.Data.次数为0时销毁;
    }
    return this.y8o;
  }
  get PresentTagIds() {
    this.R8o();
    return this.I8o;
  }
  R8o() {
    if (!this.T8o) {
      this.T8o = true;
      this.I8o = [];
      var i;
      var s = this.Data.预设标签.GameplayTags;
      var e = s.Num();
      for (let t = 0; t < e; t++) {
        if (s.IsValidIndex(t) && (i = s.Get(t)).TagName !== StringUtils_1.NONE_STRING) {
          this.I8o.push(i.TagId);
        }
      }
    }
  }
  get IgnoreWater() {
    if (this.L8o === undefined) {
      this.L8o = this.Data.忽略水体;
    }
    return this.L8o;
  }
  get DestroyOnFrozen() {
    if (this.D8o === undefined) {
      this.D8o = this.Data.冰冻时销毁;
    }
    return this.D8o;
  }
  Preload() {
    this.R8o();
  }
}
exports.BulletDataLogic = BulletDataLogic;
//# sourceMappingURL=BulletDataLogic.js.map