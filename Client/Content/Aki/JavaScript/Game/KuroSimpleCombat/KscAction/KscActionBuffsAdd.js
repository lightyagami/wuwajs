"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionBuffsAdd = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const KscActionBase_1 = require("./KscActionBase");
class KscActionBuffsAdd extends KscActionBase_1.KscActionBase {
  constructor(s) {
    super(MathUtils_1.MathUtils.LongToNumber(s.F4n ?? 0));
    this.Params = undefined;
    this.Params = s;
  }
  async RunContent() {
    var s = this.KscCtrl.CurSubModel.GetLogicProxy(this.EntityId);
    if (s === undefined) {
      this.Warn("Skill", "刷新buff时找不到Id", ["EntityId", this.EntityId], ["Params", this.Params]);
      this.SetResult();
    } else {
      await this.hcd(s);
      await this.Promise?.Promise;
    }
  }
  async hcd(s) {
    var t = this.KscCtrl.CurSubModel.KscEntities.get(s);
    if (t && t.Valid) {
      var i = Object.keys(this.Params.Rju.dju);
      try {
        var a = await this.KscCtrl.LoadBuffAssets(i);
        if (this.IsCancel) {
          this.Warn("Skill", "buff加载完成后, 任务已被取消", ["id", s], ["Params", this.Params]);
        } else {
          for (const r of i) {
            var e = Number.parseInt(r);
            var h = a.get(e);
            t.KscEntity.ApplyBuffSelf(h);
          }
        }
      } catch (s) {
        this.Warn("Skill", "实体子类型变更刷新异常" + s, ["id", this.EntityId], ["Params", this.Params]);
      } finally {
        this.SetResult();
      }
    } else {
      this.Warn("Skill", "实体子类型变更刷新buff时失败", ["id", s], ["Params", this.Params]);
      this.SetResult();
    }
  }
}
exports.KscActionBuffsAdd = KscActionBuffsAdd;
//# sourceMappingURL=KscActionBuffsAdd.js.map