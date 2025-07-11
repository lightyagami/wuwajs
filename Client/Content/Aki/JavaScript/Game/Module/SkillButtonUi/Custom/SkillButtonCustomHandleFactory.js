"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonCustomHandleFactory = undefined;
const SkillButtonCustomById_1 = require("../../../../Core/Define/ConfigQuery/SkillButtonCustomById");
const SkillButtonCustomHandle_1 = require("./SkillButtonCustomHandle");
class SkillButtonCustomHandleFactory {
  static GetSkillButtonCustomHandleById(t) {
    if (t !== 0) {
      t = SkillButtonCustomById_1.configSkillButtonCustomById.GetConfig(t);
      if (t) {
        var o = this.GetSkillButtonCustomHandleByType(t.Type);
        if (o) {
          for (const l of t.TagIds) {
            o.TagIds.push(l);
          }
          for (const u of t.BuffIds) {
            o.BuffIds.push(u);
          }
        }
        return o;
      }
    }
  }
  static GetSkillButtonCustomHandleByType(t) {
    t = SkillButtonCustomHandleFactory.Map.get(t);
    if (t) {
      return new t();
    }
  }
}
(exports.SkillButtonCustomHandleFactory = SkillButtonCustomHandleFactory).Map = new Map([[1, SkillButtonCustomHandle_1.SkillButtonCustomHandleKeLaiTaUltimate], [2, SkillButtonCustomHandle_1.SkillButtonCustomHandleHackFollowAttach], [3, SkillButtonCustomHandle_1.SkillButtonCustomHandleZanNiUltimate]]);
//# sourceMappingURL=SkillButtonCustomHandleFactory.js.map