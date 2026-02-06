"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
const TsAnimNotifyReSkillEvent_1 = require("./TsAnimNotifyReSkillEvent");
class TsAnimNotifyReSkillByTagCount extends TsAnimNotifyReSkillEvent_1.default {
  constructor() {
    super(...arguments);
    this.层数Tag = undefined;
    this.子弹数组Tag条件 = undefined;
    this.子弹数据名Tag条件 = undefined;
  }
  Constructor() {
    super.Constructor();
  }
  GetNotifyName() {
    return "根据Tag层数添加子弹";
  }
  CanCreateBullet(t, e, i) {
    var l;
    var r;
    return !!this.层数Tag && !!StringUtils_1.StringUtils.IsNothing(this.层数Tag.TagName) || ((t = t.GetEntityNoBlueprint().GetComponent(217))?.Valid ? (l = this.层数Tag.TagId, this.使用子弹id数组 ? !(i < this.子弹数组Tag条件.Num()) || (r = t.GetTagCount(l), i = this.子弹数组Tag条件.Get(i), BulletUtil_1.BulletUtil.TagStackCountCondition(r, i)) : (r = t.GetTagCount(l), i = this.子弹数据名Tag条件, BulletUtil_1.BulletUtil.TagStackCountCondition(r, i))) : (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 20, "动画Character没有Tag组件", ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)]), false));
  }
}
exports.default = TsAnimNotifyReSkillByTagCount;
//# sourceMappingURL=TsAnimNotifyReSkillByTagCount.js.map