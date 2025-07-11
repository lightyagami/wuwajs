"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visionSkill2OnRelease = exports.visionSkill2OnPress = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const Global_1 = require("../../../../../../Global");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const InputDefine_1 = require("./InputDefine");
const InputFunctionCommon_1 = require("./InputFunctionCommon");
function visionSkill2Function(o) {
  var n = Global_1.Global.BaseCharacter;
  if (n) {
    var i = n.CharacterActorComponent?.Entity;
    if (i) {
      var t = i.GetComponent(205);
      if (t && t.Valid && (0, InputFunctionCommon_1.canResponseInput)(i)) {
        n = (0, InputFunctionCommon_1.createInputCommandFromDataTable)(i.Id, 9, 1);
        if (n) {
          return n;
        }
        if (t.HasTag(1427742187)) {
          if ((0, InputFunctionCommon_1.hasEnoughEnergy)(i)) {
            return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_VISION_CONTROL);
          } else {
            return undefined;
          }
        }
        if (!t.HasTag(1787013240) || (0, InputFunctionCommon_1.hasEnoughEnergy)(i)) {
          n = PhantomUtil_1.PhantomUtil.GetSummonedEntity(i, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
          if (n?.Valid) {
            var r = n.Entity;
            if (t.HasTag(-851544994)) {
              if (t.HasTag(693080645)) {
                return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_VISION_ROGUE_2);
              } else {
                return (0, InputFunctionCommon_1.createSkillCommand)(i, InputDefine_1.SKILL_ID_VISION_ROGUE_1);
              }
            }
            n = i.GetComponent(43);
            if (n) {
              var e = n.GetVisionIdList();
              var l = n.GetVisionLevelList();
              for (let o = 0; o < e.Num(); o++) {
                var u = e.Get(o);
                var a = PhantomUtil_1.PhantomUtil.GetVisionData(u);
                if (a && a.类型 !== 2 && (a.类型 === 4 || !r.Active)) {
                  a = a.空中能否释放;
                  if (a || !t.HasTag(40422668)) {
                    var m;
                    var _ = PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(i.Id, u);
                    if (_) {
                      m = l.Get(o);
                      BlackboardController_1.BlackboardController.SetIntValueByEntity(i.Id, "VisionLevel", m);
                      BlackboardController_1.BlackboardController.SetIntValueByEntity(i.Id, "VisionID", u);
                      BlackboardController_1.BlackboardController.SetIntValueByEntity(i.Id, "VisionAirSkill", Number(a));
                      BlackboardController_1.BlackboardController.SetIntValueByEntity(i.Id, "VisionLink", Number(t.HasAnyTag([1408042260, 64219164, -488074998, 41340438])));
                      return (0, InputFunctionCommon_1.createSkillCommand)(i, _);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function visionSkill2OnPress(o) {
  return visionSkill2Function(o);
}
function visionSkill2OnRelease(o) {}
exports.visionSkill2OnPress = visionSkill2OnPress;
exports.visionSkill2OnRelease = visionSkill2OnRelease; //# sourceMappingURL=InputFunctionVisionSkill2.js.map