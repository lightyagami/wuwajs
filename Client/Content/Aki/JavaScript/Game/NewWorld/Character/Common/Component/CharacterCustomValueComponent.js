"use strict";

var CharacterCustomValueComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, r) {
  var a;
  var i = arguments.length;
  var n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, r);
  } else {
    for (var u = t.length - 1; u >= 0; u--) {
      if (a = t[u]) {
        n = (i < 3 ? a(n) : i > 3 ? a(e, o, n) : a(e, o)) || n;
      }
    }
  }
  if (i > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCustomValueComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ConditionFormula_1 = require("../../../../Utils/Trigger/ConditionFormula");
let CharacterCustomValueComponent = CharacterCustomValueComponent_1 = class CharacterCustomValueComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.H4_ = undefined;
    this.nK_ = new Map();
    this.$4_ = (t, e) => {
      if (t) {
        this.H4_ = t;
        t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(this.H4_, t);
        for (const a of t) {
          var o;
          var r = a[0];
          if (r === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 20, "[自定义值]配置错误 key是空的", ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
            }
          } else if ((o = a[1]) === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 20, "[自定义值]配置错误 value是空的", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
            }
          } else {
            this.nK_.set(r, o);
            if (o.NumSource === 0 && o.ReturnType === 0) {
              this.Yre.set(r, o.NumberValue.Get(0));
            } else if (o.VecSource === 0 && o.ReturnType === 1) {
              this.Yre.set(r, Vector_1.Vector.Create(o.VectorValue.Get(0)));
            } else if (o.RotSource === 0 && o.ReturnType === 2) {
              this.Yre.set(r, Rotator_1.Rotator.Create(o.RotatorValue.Get(0)));
            }
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 20, "[自定义值]加载配置完成，设置固定值", ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()], ["固定值", this.Yre]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "[自定义值]CDT_CharacterFightInfo中的路径配置的表路径找不到资源", ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()], ["Path", e]);
      }
    };
    this.Yre = new Map();
  }
  OnStart() {
    var t = this.Entity.GetComponent(3);
    var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(t.Actor.GetClass());
    var t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
    var t = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t)?.CustomParamTable?.ToAssetPathName();
    if (t) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, this.$4_);
      this.W4_();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 20, "[自定义值]CDT_CharacterFightInfo中的路径配置的表路径为空", ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
    }
    return true;
  }
  W4_() {
    if (!(CharacterCustomValueComponent_1.Q4_.size > 0)) {
      CharacterCustomValueComponent_1.Q4_.set("MClamp", (t, e, o) => MathCommon_1.MathCommon.Clamp(t, e, o));
      CharacterCustomValueComponent_1.Q4_.set("MMax", (...t) => Math.max(...t));
      CharacterCustomValueComponent_1.Q4_.set("MMin", (...t) => Math.min(...t));
      CharacterCustomValueComponent_1.Q4_.set("VAdd", (t, e) => {
        var o = Vector_1.Vector.Create();
        t.Addition(e, o);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("VSub", (t, e) => {
        var o = Vector_1.Vector.Create();
        t.Subtraction(e, o);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("VMulti", (t, e) => {
        var o = Vector_1.Vector.Create();
        t.Multiply(e, o);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("VDiv", (t, e) => {
        var o = Vector_1.Vector.Create();
        t.Division(e, o);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("VDotProduct", (t, e) => Vector_1.Vector.DotProduct(t, e));
      CharacterCustomValueComponent_1.Q4_.set("VCrossProduct", (t, e) => {
        var o = Vector_1.Vector.Create();
        Vector_1.Vector.CrossProduct(t, e, o);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("VNormal", t => {
        var e = Vector_1.Vector.Create();
        t.GetSafeNormal(e);
        return e;
      });
      CharacterCustomValueComponent_1.Q4_.set("VDist", (t, e) => Vector_1.Vector.Dist(t, e));
      CharacterCustomValueComponent_1.Q4_.set("VDistXY", (t, e) => Vector_1.Vector.DistXY(t, e));
      CharacterCustomValueComponent_1.Q4_.set("VDistSquared", (t, e) => Vector_1.Vector.DistSquared(t, e));
      CharacterCustomValueComponent_1.Q4_.set("VDistSquaredXY", (t, e) => Vector_1.Vector.DistSquaredXY(t, e));
      CharacterCustomValueComponent_1.Q4_.set("VGetClampedToSize", (t, e, o) => {
        var r = Vector_1.Vector.Create();
        t.GetClampedToSize(e, o, r);
        return r;
      });
      CharacterCustomValueComponent_1.Q4_.set("VGetClampedToSize2D", (t, e, o) => {
        var r = Vector_1.Vector.Create();
        t.GetClampedToSize2D(e, o, r);
        return r;
      });
      CharacterCustomValueComponent_1.Q4_.set("VMax", t => t.GetMax());
      CharacterCustomValueComponent_1.Q4_.set("VMin", t => t.GetMin());
      CharacterCustomValueComponent_1.Q4_.set("VAbsMax", t => t.GetAbsMax());
      CharacterCustomValueComponent_1.Q4_.set("VAbsMin", t => t.GetAbsMin());
      CharacterCustomValueComponent_1.Q4_.set("VRotation", t => {
        var e = Rotator_1.Rotator.Create();
        t.Rotation(e);
        return e;
      });
      CharacterCustomValueComponent_1.Q4_.set("VSetX", (t, e) => {
        t = Vector_1.Vector.Create(t);
        t.X = e;
        return t;
      });
      CharacterCustomValueComponent_1.Q4_.set("VSetY", (t, e) => {
        t = Vector_1.Vector.Create(t);
        t.Y = e;
        return t;
      });
      CharacterCustomValueComponent_1.Q4_.set("VSetZ", (t, e) => {
        t = Vector_1.Vector.Create(t);
        t.Z = e;
        return t;
      });
      CharacterCustomValueComponent_1.Q4_.set("VRotateAngleAxis", (t, e, o) => {
        var r = Vector_1.Vector.Create();
        t.RotateAngleAxis(e, o, r);
        return r;
      });
      CharacterCustomValueComponent_1.Q4_.set("RAdd", (t, e) => {
        var o = Rotator_1.Rotator.Create();
        o.FromUeRotator(t);
        o.AdditionEqual(e);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("RSub", (t, e) => {
        var o = Rotator_1.Rotator.Create();
        o.FromUeRotator(t);
        o.SubtractionEqual(e);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("RMulti", (t, e) => {
        var o = Rotator_1.Rotator.Create();
        o.FromUeRotator(t);
        o.MultiplyEqual(e);
        return o;
      });
      CharacterCustomValueComponent_1.Q4_.set("RVector", t => {
        var e = Vector_1.Vector.Create();
        t.Vector(e);
        return e;
      });
      CharacterCustomValueComponent_1.Q4_.set("IsNull", t => this.Yre.get(t) === undefined);
    }
  }
  GetBlackboard(t, e = undefined) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      var o = this.nK_.get(t);
      if (!o) {
        if (e !== undefined) {
          return e;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 20, "[自定义值]AN配置的key在DT表中找不到对应的行", ["Key", t], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
          }
          return;
        }
      }
      if (o.ReturnType === 0 && o.NumSource === 0) {
        return o.NumberValue.Get(0);
      }
      if (o.ReturnType === 1 && o.VecSource === 0) {
        return Vector_1.Vector.Create(o.VectorValue.Get(0));
      }
      if (o.ReturnType === 2 && o.RotSource === 0) {
        return Rotator_1.Rotator.Create(o.RotatorValue.Get(0));
      }
    }
    o = this.Yre.get(t);
    if (o === undefined) {
      if (e !== undefined) {
        return e;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "[自定义值]Blackboard值获取不到", ["Key", t]);
      }
    }
    return o;
  }
  UpdateCustomValue(r) {
    var a = this.nK_.get(r);
    if (a) {
      let o = undefined;
      if (a.ReturnType === 0 && a.NumSource === 0 || a.ReturnType === 1 && a.VecSource === 0 || a.ReturnType === 2 && a.RotSource === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "[自定义值]固定值不能更新值", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
        }
      } else if (a.ReturnType === 0 && a.NumSource === 1 || a.ReturnType === 1 && a.VecSource === 1 || a.ReturnType === 2 && a.RotSource === 1) {
        var t = a.FormulaList.Num();
        for (let e = 0; e < t; e++) {
          var i = a.FormulaList.Get(e);
          let t = true;
          if (!StringUtils_1.StringUtils.IsEmpty(i.Condition)) {
            try {
              var n = new ConditionFormula_1.Formula(i.Condition).SetBuiltinFunctions(CharacterCustomValueComponent_1.Q4_);
              t = n.Evaluate(Object.fromEntries(this.Yre.entries()));
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]条件表达式计算结果", ["Key", r], ["表达式序号", e], ["Value", t]);
              }
            } catch (t) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Battle", 20, "[自定义值]条件表达式计算出现异常", ["Key", r], ["表达式序号", e], ["表达式", i.Condition], ["Value", t instanceof Error ? t.message : t]);
              }
            }
          }
          if (t) {
            try {
              var u = new ConditionFormula_1.Formula(i.Value).SetBuiltinFunctions(CharacterCustomValueComponent_1.Q4_);
              if ((o = u.Evaluate(Object.fromEntries(this.Yre.entries()))) === undefined) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Battle", 20, "[自定义值]取值失败", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
                }
                return;
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]表达式计算结果", ["Key", r], ["表达式序号", e], ["Value", o]);
              }
              this.Yre.set(r, o);
            } catch (t) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Battle", 20, "[自定义值]表达式计算出现异常", ["Key", r], ["表达式序号", e], ["表达式", i.Value], ["Value", t instanceof Error ? t.message : t]);
              }
            }
            if (!i.IsContinueFormula) {
              break;
            }
          }
        }
      } else {
        if (a.ReturnType === 1) {
          if (a.VecSource === 3) {
            o = Vector_1.Vector.Create(this.Entity.GetComponent(1)?.ActorLocationProxy);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]使用者位置 计算结果", ["Key", r], ["Value", o]);
            }
          } else if (a.VecSource === 2) {
            var e = this.Entity.GetComponent(43)?.SkillTarget;
            if (!e?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            o = Vector_1.Vector.Create(e.Entity.GetComponent(1)?.ActorLocationProxy);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标位置 计算结果", ["Key", r], ["Value", o]);
            }
          } else if (a.VecSource === 4) {
            e = this.Entity.GetComponent(43)?.SkillTarget;
            if (!e?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            var e = e.Entity.GetComponent(1).ActorLocationProxy;
            var _ = this.Entity.GetComponent(1).ActorLocationProxy;
            var l = Vector_1.Vector.Create();
            e.Subtraction(_, l);
            l.Normalize();
            o = l;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标位置 计算结果", ["Key", r], ["Value", o]);
            }
          } else if (a.VecSource === 5) {
            e = this.Entity.GetComponent(43)?.SkillTarget;
            if (!e?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            _ = e.Entity.GetComponent(1).ActorLocationProxy;
            l = this.Entity.GetComponent(1).ActorLocationProxy;
            e = Vector_1.Vector.Create();
            _.Subtraction(l, e);
            e.Z = 0;
            e.Normalize();
            o = e;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标位置 计算结果", ["Key", r], ["Value", o]);
            }
          } else if (a.VecSource === 6) {
            _ = this.Entity.GetComponent(1)?.ActorForwardProxy;
            if (_ && (o = Vector_1.Vector.Create(_), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          } else if (a.VecSource === 7) {
            l = this.Entity.GetComponent(1)?.ActorRightProxy;
            if (l && (o = Vector_1.Vector.Create(l), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          } else if (a.VecSource === 8) {
            e = this.Entity.GetComponent(1)?.ActorUpProxy;
            if (e && (o = Vector_1.Vector.Create(e), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          } else if (a.VecSource === 9) {
            _ = this.Entity.GetComponent(43)?.SkillTarget;
            if (!_?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            l = _.Entity.GetComponent(1)?.ActorForwardProxy;
            if (l && (o = Vector_1.Vector.Create(l), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          } else if (a.VecSource === 10) {
            e = this.Entity.GetComponent(43)?.SkillTarget;
            if (!e?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            _ = e.Entity.GetComponent(1)?.ActorRightProxy;
            if (_ && (o = Vector_1.Vector.Create(_), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          } else if (a.VecSource === 11) {
            l = this.Entity.GetComponent(43)?.SkillTarget;
            if (!l?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            e = l.Entity.GetComponent(1)?.ActorUpProxy;
            if (e && (o = Vector_1.Vector.Create(e), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Bullet", 20, "[自定义值]获取到参数值", ["key", r], ["value", o]);
            }
          }
        } else if (a.ReturnType === 2) {
          if (a.RotSource === 3) {
            o = Rotator_1.Rotator.Create(this.Entity.GetComponent(1)?.ActorRotationProxy);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]使用者朝向 计算结果", ["Key", r], ["Value", o]);
            }
          } else if (a.RotSource === 2) {
            _ = this.Entity.GetComponent(43)?.SkillTarget;
            if (!_?.Valid) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标不存在", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
              }
              this.Yre.set(r, undefined);
              return;
            }
            o = Rotator_1.Rotator.Create(_.Entity.GetComponent(1)?.ActorRotationProxy);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 20, "[自定义值]技能目标朝向 计算结果", ["Key", r], ["Value", o]);
            }
          }
        }
        if (o) {
          this.Yre.set(r, o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "[自定义值]取值失败", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 20, "[自定义值]AN配置的key在DT表中找不到对应的行", ["Key", r], ["Actor", this.Entity.GetComponent(1)?.Owner?.GetName()]);
    }
  }
};
CharacterCustomValueComponent.Q4_ = new Map();
CharacterCustomValueComponent = CharacterCustomValueComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(307)], CharacterCustomValueComponent);
exports.CharacterCustomValueComponent = CharacterCustomValueComponent; //# sourceMappingURL=CharacterCustomValueComponent.js.map