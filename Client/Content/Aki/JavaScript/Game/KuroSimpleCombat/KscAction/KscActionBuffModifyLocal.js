"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionBuffModifyLocal = undefined;
const KSCBuffById_1 = require("../../../Core/Define/ConfigQuery/KSCBuffById");
const KscEnv_1 = require("../KscEnv");
const KscUtil_1 = require("../KscUtil");
const KscActionBase_1 = require("./KscActionBase");
class KscActionBuffModifyLocal extends KscActionBase_1.KscActionBase {
  constructor(s, i, t) {
    super(0);
    this.KscEntityId = 0;
    this.IsAdd = false;
    this.BuffId = 0;
    this.KscEntityId = s;
    this.IsAdd = i;
    this.BuffId = t;
  }
  async RunContent() {
    this.FKu(this.KscEntityId);
    await this.Promise?.Promise;
  }
  FKu(s) {
    const i = this.IsAdd;
    const t = this.BuffId;
    const c = this.KscCtrl.CurSubModel.KscEntities.get(s);
    var e;
    if (c && c.Valid) {
      if (e = KSCBuffById_1.configKSCBuffById.GetConfig(t)?.AssetPath) {
        KscUtil_1.KscUtil.AsyncLoadKscAsset({
          Context: KscEnv_1.KscEnv.KscWorld,
          Id: t,
          Path: e,
          NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedBuffDa,
          Callback: s => {
            if (this.KscCtrl.WorldInit) {
              KscEnv_1.KscEnv.KscWorld?.BuffData?.AddBuffDA(BigInt(t), s);
              if (i) {
                c.KscEntity.ApplyBuffSelf(s);
              } else {
                c.KscEntity.RemoveBuffSelf(s);
              }
            } else {
              this.Warn("Load", "战斗实体加载失败，KSC世界已清理");
            }
            this.SetResult();
          },
          FailCallback: s => {
            this.Warn("Skill", "添加buff失败,未查到资产,BuffId:" + t);
            this.SetResult();
          },
          KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
        });
      } else {
        this.Error("Skill", "Buff路径非法", ["buffId", t]);
        this.SetResult();
      }
    } else {
      this.Warn("Skill", "刷新buff时失败", ["id", s], ["buffId", this.BuffId]);
      this.SetResult();
    }
  }
}
exports.KscActionBuffModifyLocal = KscActionBuffModifyLocal;
//# sourceMappingURL=KscActionBuffModifyLocal.js.map