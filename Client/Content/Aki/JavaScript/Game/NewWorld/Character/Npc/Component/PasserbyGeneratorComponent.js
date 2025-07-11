"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (n < 3 ? i(s) : n > 3 ? i(t, o, s) : i(t, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasserbyGeneratorComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../../Global");
const GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SplineStateInfo {
  constructor(e, t) {
    this.PbDataId = 0;
    this.Location = Vector_1.Vector.Create();
    this.InRange = false;
    this.PbDataId = e;
    this.Location = t;
  }
}
let PasserbyGeneratorComponent = class PasserbyGeneratorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.EIe = undefined;
    this.Tin = Array();
    this.Lin = 0;
    this.Din = true;
    this.Xot = Vector_1.Vector.Create();
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1);
    this.EIe = this.Entity.GetComponent(0);
    var e;
    var t;
    var o = (0, IComponent_1.getComponent)(this.EIe.GetPbEntityInitData().ComponentsData, "PasserbyNpcSpawnComponent");
    if (!o?.SpawnConfig.MinDistance) {
      return !(this.Din = false);
    }
    this.Lin = o.SpawnConfig.MinDistance * o.SpawnConfig.MinDistance;
    for (const r of o.MoveConfig.Routes) {
      if (r.IsLoop) {
        e = r.SplineEntityId;
        if ((t = new GameSplineComponent_1.GameSplineComponent(e)).Initialize()) {
          if (t.GetNumberOfSplinePoints()) {
            this.Tin.push(new SplineStateInfo(e, t.GetWorldLocationAtSplinePoint(0)));
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("NPC", 50, "行人生成器获取样条信息错误", ["PbDataId", this.EIe?.GetPbDataId()], ["SplinePbDataId", e]);
        }
      }
    }
    if (!this.Tin.length) {
      this.Din = false;
    }
    return true;
  }
  OnTick(e) {
    if (this.Din) {
      for (const t of this.Tin) {
        if (this.Rin(t.Location)) {
          if (!t.InRange) {
            t.InRange = true;
            this.Uin(t.PbDataId, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("NPC", 50, "进入生成范围", ["PbDataId", this.EIe?.GetPbDataId()]);
            }
          }
        } else if (t.InRange && (t.InRange = false, this.Uin(t.PbDataId, false), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("NPC", 50, "离开生成范围", ["PbDataId", this.EIe?.GetPbDataId()]);
        }
      }
    }
  }
  Rin(e) {
    let t = MathUtils_1.MathUtils.MaxFloat;
    var o;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      o = this.Ain(e);
      t = o.MinDistSquared;
    } else if ((o = Global_1.Global.BaseCharacter)?.IsValid()) {
      o.CharacterActorComponent.ActorLocationProxy.Subtraction(e, this.Xot);
      t = this.Xot.SizeSquared2D();
    }
    return t < this.Lin;
  }
  Uin(t, e) {
    var o = Protocol_1.Aki.Protocol.rts.create();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
    o.eKn = t;
    o.tKn = e;
    Net_1.Net.Call(27912, o, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "请求行人生成器生成NPC失败", ["CreatureId", this.Hte?.CreatureData.GetCreatureDataId()], ["SplineId", t], ["ErrorCode", e.Q4n]);
      }
    });
  }
  Ain(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap;
    var o = ModelManager_1.ModelManager.SceneTeamModel;
    let r = undefined;
    let i = MathUtils_1.MathUtils.MaxFloat;
    for (const a of t) {
      var n;
      var s = o.GetTeamItem(a[0], {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle;
      if (s && (s.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.Xot), (n = this.Xot.SizeSquared2D()) < i)) {
        i = n;
        r = s;
      }
    }
    return {
      PlayerEntity: r,
      MinDistSquared: i
    };
  }
};
PasserbyGeneratorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(211)], PasserbyGeneratorComponent);
exports.PasserbyGeneratorComponent = PasserbyGeneratorComponent; //# sourceMappingURL=PasserbyGeneratorComponent.js.map