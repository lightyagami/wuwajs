"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicWhirlpool = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const WhirlpoolPoint_1 = require("../../Character/Common/Component/Move/WhirlpoolPoint");
const BulletConstant_1 = require("../BulletConstant");
const BulletLogicController_1 = require("./BulletLogicController");
const DEBUG_SEGMENTS = 10;
const DEBUG_DURATION = 3;
const DEBUG_THICKNESS = 3;
class BulletLogicWhirlpool extends BulletLogicController_1.BulletLogicController {
  constructor(t, o) {
    super(t, o);
    this.Y7o = 0;
    this.a7o = undefined;
    this.xe = 0;
    this.J7o = 0;
    this.z7o = new Set();
    this.UAe = Vector_1.Vector.Create();
    this.NeedTick = true;
    this.Y7o = t.WeightLimit;
    this.a7o = o.GetBulletInfo();
    this.xe = WhirlpoolPoint_1.WhirlpoolPoint.GenId();
    this.J7o = t.MoveTime;
  }
  OnInit() {}
  Update(t) {
    var o;
    for ([o] of this.a7o.CollisionInfo.CharacterEntityMap) {
      this.z7o.add(o);
    }
    for (const i of this.z7o) {
      this.Z7o(i);
    }
  }
  Z7o(t) {
    var o = t?.GetComponent(189);
    if (!!o?.Valid && !(this.Y7o < o.CharacterWeight)) {
      if (o.GetWhirlpoolId() !== this.xe) {
        if (!o.GetWhirlpoolEnable() || !!o.CompareWhirlpoolPriority(this.J7o)) {
          this.KYf();
          o.BeginWhirlpool(this.xe, this.J7o, this.UAe, o.ActorComp.ActorLocationProxy, -1, this.LogicController.VelocityCurve, this.LogicController.CancelByHit, GameplayTagUtils_1.GameplayTagUtils.IsValidTag(this.LogicController.TagNeed) ? GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.LogicController.TagNeed.TagName) : 0);
          if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 20, "吸附-添加", ["Entity", t.Id], ["ToLocation", this.UAe], ["BeginLocation", o.ActorComp.ActorLocationProxy]);
          }
        }
      } else {
        this.KYf();
        if (BulletConstant_1.BulletConstant.OpenMoveLog) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 20, "吸附-刷新", ["Entity", t.Id], ["ToLocation", this.UAe], ["BeginLocation", o.ActorComp.ActorLocationProxy]);
          }
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, this.UAe.ToUeVector(), 10, DEBUG_SEGMENTS, ColorUtils_1.ColorUtils.LinearGreen, DEBUG_DURATION, DEBUG_THICKNESS);
        }
        o.UpdateWhirlpoolLocation(this.UAe);
      }
    }
  }
  KYf() {
    if (FNameUtil_1.FNameUtil.IsNothing(this.LogicController.AttackerSocketName)) {
      this.UAe.FromUeVector(this.a7o.ActorComponent.ActorLocationProxy);
    } else {
      this.UAe.FromUeVector(this.a7o.AttackerActorComp.GetSocketLocation(this.LogicController.AttackerSocketName));
    }
  }
  OnBulletDestroy() {
    for (const o of this.z7o) {
      var t = o?.GetComponent(189);
      if (t?.Valid && t.GetWhirlpoolEnable() && t.GetWhirlpoolId() === this.xe && (t.EndWhirlpool("子弹销毁"), BulletConstant_1.BulletConstant.OpenMoveLog) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "吸附-角色解除", ["Entity", o.Id], ["BulletLocation", this.a7o.ActorComponent.ActorLocationProxy], ["ToLocation", t.ActorComp.ActorLocationProxy]);
      }
    }
    this.z7o.clear();
  }
}
exports.BulletLogicWhirlpool = BulletLogicWhirlpool;
//# sourceMappingURL=BulletLogicWhirlpool.js.map