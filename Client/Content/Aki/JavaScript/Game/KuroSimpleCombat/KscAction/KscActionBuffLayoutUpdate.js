"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionBuffLayoutUpdate = undefined;
const KSCBuffById_1 = require("../../../Core/Define/ConfigQuery/KSCBuffById");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const KscEnv_1 = require("../KscEnv");
const KscUtil_1 = require("../KscUtil");
const KscActionBase_1 = require("./KscActionBase");
class KscActionBuffLayoutUpdate extends KscActionBase_1.KscActionBase {
  constructor(t) {
    super(MathUtils_1.MathUtils.LongToNumber(t.F4n ?? 0));
    this.Params = undefined;
    this.Params = t;
  }
  async RunContent() {
    var t = this.KscCtrl.CurSubModel.GetLogicProxy(this.EntityId);
    if (t === undefined) {
      this.Warn("Skill", "刷新buff Layer时时找不到Id", ["EntityId", this.EntityId], ["Params", this.Params]);
      this.SetResult();
    } else {
      this.wfd(t);
      await this.Promise?.Promise;
    }
  }
  wfd(t) {
    const s = this.Params.b6n;
    const i = this.Params.I_d;
    const a = this.KscCtrl.CurSubModel.KscEntities.get(t);
    var e;
    if (a && a.Valid) {
      if (e = KSCBuffById_1.configKSCBuffById.GetConfig(s)?.AssetPath) {
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: s,
          Path: e,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: t => {
            if (this.KscCtrl.WorldInit) {
              this.Info("Skill", "更新Buff", ["kscEntityHandle", a], ["buffId", s], ["layerCount", i], ["buffDa", t?.GetName()]);
              a.KscEntity.UpdateBuffWithStackNumSelf(t, i);
            } else {
              this.Warn("Load", "战斗实体加载失败，KSC世界已清理");
            }
            this.SetResult();
          },
          FailCallback: t => {
            this.Warn("Skill", "添加buff Layout时失败,未查到资产,BuffId:" + s, ["Params", this.Params]);
            this.SetResult();
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      } else {
        this.Warn("Skill", `Buff Layout时 ${s}安全加载路径非法`, ["Params", this.Params]);
        this.SetResult();
      }
    } else {
      this.Warn("Skill", "刷新buff Layout时失败", ["id", t], ["Params", this.Params]);
      this.SetResult();
    }
  }
}
exports.KscActionBuffLayoutUpdate = KscActionBuffLayoutUpdate;
//# sourceMappingURL=KscActionBuffLayoutUpdate.js.map