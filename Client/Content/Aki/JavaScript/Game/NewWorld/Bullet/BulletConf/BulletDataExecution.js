"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataExecution = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const LogicDataRebound_1 = require("../LogicDataClass/LogicDataRebound");
class BulletDataExecution {
  constructor(t) {
    this.Pe = undefined;
    this.Y6o = false;
    this.J6o = undefined;
    this.MovementReplaced = false;
    this.ReboundBitMask = 0;
    this.SupportCamp = undefined;
    this.HasReboundInternal = false;
    this.hn_ = undefined;
    this.dv1 = undefined;
    this.mv1 = false;
    this.z6o = undefined;
    this.Z6o = undefined;
    this.e8o = undefined;
    this.t8o = undefined;
    this.i8o = undefined;
    this.o8o = undefined;
    this.r8o = undefined;
    this.n8o = undefined;
    this.s8o = undefined;
    this.Pe = t;
  }
  get GbDataList() {
    this.InitGbGroup();
    return this.J6o;
  }
  get HasRebound() {
    return this.HasReboundInternal;
  }
  InitGbGroup() {
    if (!this.Y6o) {
      this.Y6o = true;
      var t = this.Pe.GB组.ToAssetPathName();
      if (t && t.length > 0 && t !== "None") {
        this.hn_ = ResourceSystem_1.ResourceSystem.Load(t, UE.KuroBpDataAssetGroup);
        var i = this.hn_?.Data;
        var e = i?.Num() ?? 0;
        if (e > 0) {
          this.J6o = new Array();
          this.SupportCamp = new Array();
          for (let t = this.ReboundBitMask = 0; t < e; t++) {
            var s = i.Get(t);
            this.J6o.push(s);
            if (!this.HasReboundInternal && s instanceof LogicDataRebound_1.default) {
              this.HasReboundInternal = true;
            }
          }
        }
      }
    }
  }
  get TagIdOnVictimEnter() {
    if (!this.mv1) {
      this.mv1 = true;
      var i = this.Pe?.受击对象进入添加Tag?.GameplayTags;
      var e = i?.Num() ?? 0;
      if (e > 0) {
        this.dv1 = new Array();
        for (let t = 0; t < e; t++) {
          var s = i.Get(t);
          this.dv1.push(s.TagId);
        }
      }
    }
    return this.dv1;
  }
  get GeIdApplyToVictim() {
    if (!this.z6o) {
      this.z6o = new Array();
      var i = this.Pe.受击对象进入应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) {
        this.z6o.push(Number(i.Get(t)));
      }
    }
    return this.z6o;
  }
  get SendGameplayEventTagToVictim() {
    if (this.Z6o === undefined) {
      this.Z6o = this.Pe.命中后对受击者发射GameplayEvent标签;
    }
    return this.Z6o;
  }
  get SendGeIdToVictim() {
    if (!this.e8o) {
      this.e8o = new Array();
      var i = this.Pe.命中后对受击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) {
        this.e8o.push(Number(i.Get(t)));
      }
    }
    return this.e8o;
  }
  get SendGeIdToRoleInGame() {
    if (!this.t8o) {
      this.t8o = new Array();
      var i = this.Pe.命中后对在场上角色应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) {
        this.t8o.push(Number(i.Get(t)));
      }
    }
    return this.t8o;
  }
  get SendGameplayEventTagToAttacker() {
    if (this.i8o === undefined) {
      this.i8o = this.Pe.命中后对攻击者发射GameplayEvent标签;
    }
    return this.i8o;
  }
  get SendGeIdToAttacker() {
    if (!this.o8o) {
      this.o8o = new Array();
      var i = this.Pe.命中后对攻击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) {
        this.o8o.push(Number(i.Get(t)));
      }
    }
    return this.o8o;
  }
  get SendGameplayEventTagToAttackerOnEnd() {
    if (this.r8o === undefined) {
      this.r8o = this.Pe.结束时对攻击者发射GameplayEvent标签;
    }
    return this.r8o;
  }
  get EnergyRecoverGeIds() {
    if (!this.n8o) {
      this.n8o = new Array();
      var i = this.Pe.能量恢复类GE数组的Id;
      for (let t = 0; t < i.Num(); ++t) {
        this.n8o.push(Number(i.Get(t)));
      }
    }
    return this.n8o;
  }
  get SendGameplayEventTagToAttackerOnStart() {
    if (this.s8o === undefined) {
      this.s8o = this.Pe.生成时对攻击者发射GameplayEvent标签;
    }
    return this.s8o;
  }
  Preload() {
    this.InitGbGroup();
    return true;
  }
}
exports.BulletDataExecution = BulletDataExecution;
//# sourceMappingURL=BulletDataExecution.js.map