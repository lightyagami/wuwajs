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
    n = n.CharacterActorComponent?.Entity;
    if (n) {
      var i;
      var t;
      var e;
      var l;
      var r = n.GetComponent(217);
      if (r && r.Valid) {
        if ((0, InputFunctionCommon_1.canResponseInput)(n)) {
          return (0, InputFunctionCommon_1.createInputCommandFromDataTable)(n.Id, 9, 1) || (r.HasTag(1427742187) ? (0, InputFunctionCommon_1.hasEnoughEnergy)(n) ? (0, InputFunctionCommon_1.createSkillCommand)(n, InputDefine_1.SKILL_ID_VISION_CONTROL) : undefined : !r.HasTag(1787013240) || (0, InputFunctionCommon_1.hasEnoughEnergy)(n) ? r.HasTag(-851544994) ? r.HasTag(693080645) ? (0, InputFunctionCommon_1.createSkillCommand)(n, InputDefine_1.SKILL_ID_VISION_ROGUE_2) : (0, InputFunctionCommon_1.createSkillCommand)(n, InputDefine_1.SKILL_ID_VISION_ROGUE_1) : (l = n.GetComponent(46)) && (i = l.GetVisionId()) && (e = PhantomUtil_1.PhantomUtil.GetVisionData(i)) && (t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(n, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision))?.Valid && (!t.Entity.Active || e.类型 === 4) && ((t = e.空中能否释放) || !r.HasTag(40422668)) && (e = PhantomUtil_1.PhantomUtil.GetEntityVisionSkillId(n.Id, i)) ? (l = l.GetVisionLevel(), BlackboardController_1.BlackboardController.SetIntValueByEntity(n.Id, "VisionLevel", l), BlackboardController_1.BlackboardController.SetIntValueByEntity(n.Id, "VisionID", i), BlackboardController_1.BlackboardController.SetIntValueByEntity(n.Id, "VisionAirSkill", Number(t)), BlackboardController_1.BlackboardController.SetIntValueByEntity(n.Id, "VisionLink", Number(r.HasAnyTag([1408042260, 64219164, -488074998, 41340438]))), (0, InputFunctionCommon_1.createSkillCommand)(n, e)) : undefined : undefined);
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