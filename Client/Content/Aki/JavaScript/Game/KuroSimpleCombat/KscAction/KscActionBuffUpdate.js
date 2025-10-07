"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionBuffUpdate = undefined;
const KSCBuffById_1 = require("../../../Core/Define/ConfigQuery/KSCBuffById");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const KscEnv_1 = require("../KscEnv");
const KscUtil_1 = require("../KscUtil");
const KscActionBase_1 = require("./KscActionBase");
class KscActionBuffUpdate extends KscActionBase_1.KscActionBase {
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
      this.FKu(s);
      await this.Promise?.Promise;
    }
  }
  FKu(s) {
    const t = this.Params.t9u;
    const i = this.Params.b6n;
    const e = this.KscCtrl.CurSubModel.KscEntities.get(s);
    var a;
    if (e && e.Valid) {
      if (a = KSCBuffById_1.configKSCBuffById.GetConfig(i)?.AssetPath) {
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: i,
          Path: a,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: s => {
            if (this.KscCtrl.WorldInit) {
              KscEnv_1.KscEnv.KscWorld?.BuffData?.AddBuffDA(BigInt(i), s);
              if (t) {
                e.KscEntity.ApplyBuffSelf(s);
              } else {
                e.KscEntity.RemoveBuffSelf(s);
              }
            } else {
              this.Warn("Load", "战斗实体加载失败，KSC世界已清理");
            }
            this.SetResult();
          },
          FailCallback: s => {
            this.Warn("Skill", "添加buff失败,未查到资产,BuffId:" + i, ["Params", this.Params]);
            this.SetResult();
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      } else {
        this.Warn("Skill", `Buff${i}安全加载路径非法`, ["Params", this.Params]);
        this.SetResult();
      }
    } else {
      this.Warn("Skill", "刷新buff时失败", ["id", s], ["Params", this.Params]);
      this.SetResult();
    }
  }
}
exports.KscActionBuffUpdate = KscActionBuffUpdate;
//# sourceMappingURL=KscActionBuffUpdate.js.map