"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscActionEntityAdd = undefined;
const KscEnv_1 = require("../KscEnv");
const KscUtil_1 = require("../KscUtil");
const KscActionBase_1 = require("./KscActionBase");
class KscActionEntityAdd extends KscActionBase_1.KscActionBase {
  constructor(t) {
    super(t.CreatureId);
    this.Params = undefined;
    this.z3d = t => {
      if (this.KscCtrl.WorldInit) {
        if (t?.IsValid()) {
          if (this.IsCancel) {
            this.Warn("Load", "战斗实体加载完成任务被取消", ["Id", this.EntityId], ["Class", this.constructor.name]);
            this.SetResult();
          } else {
            this.Info("Load", "生成战斗实体时加载成功", ["Path", this.Params.AssetPath]);
            this.ogd(t, this.Params).then(t => {
              this.Info("Load", "安全加入战斗实体", ["Path", this.Params.AssetPath]);
              if (this.Params.FinishCallback && t) {
                this.Params.FinishCallback(t);
              }
            }).catch(t => {
              this.Warn("Load", "安全加入战斗实体异常", ["Path", this.Params.AssetPath], ["error", t]);
            }).finally(() => {
              this.SetResult();
            });
          }
        } else {
          this.Warn("Load", "战斗实体加载失败", ["Path", this.Params.AssetPath]);
          this.SetResult();
        }
      } else {
        this.Warn("Load", "战斗实体加载失败，KSC世界已清理");
        this.SetResult();
      }
    };
    this.J3d = () => {
      this.SetResult();
    };
    this.Params = t;
  }
  async RunContent() {
    KscUtil_1.KscUtil.AsyncLoadKscAsset({
      Context: KscEnv_1.KscEnv.KscWorld,
      Id: this.Params.SimpleCombatId,
      Path: this.Params.AssetPath,
      NativeContainer: KscEnv_1.KscEnv.KscWorld?.LoadedEntityDa,
      Callback: this.z3d,
      FailCallback: this.J3d,
      KscWorldHandle: KscEnv_1.KscEnv.KscWorldHandle
    });
    await this.Promise?.Promise;
  }
  async ogd(t, s) {
    try {
      if (!s.Buffs || s.Buffs.length === 0) {
        return this.KscCtrl.AddEntityImpl(t, s);
      }
      var i = Object.keys(s.Buffs);
      var h = await this.KscCtrl.LoadBuffAssets(i);
      if (!this.KscCtrl.WorldInit) {
        throw new Error(`加载战斗实体${t.GetName()}后，世界已清理`);
      }
      if (this.IsCancel) {
        throw new Error(`加载战斗实体里的Buffs后，任务已被取消, Id=${this.EntityId}, ${this.constructor.name}`);
      }
      var r = this.KscCtrl.AddEntityImpl(t, s);
      if (!r) {
        throw new Error(`战斗实体${t.GetName()}外部关联资产安全加载正常,但后续加入异常`);
      }
      for (const c of i) {
        var a = Number.parseInt(c);
        var o = h.get(a);
        var e = s.Buffs[c];
        r.ApplyBuffSelf(o);
        if (e > 1) {
          r.UpdateBuffWithStackNumSelf(o, e);
        }
      }
      return r;
    } catch (t) {
      this.Warn("Load", "战斗实体安全加入异常" + t);
      throw t;
    }
  }
}
exports.KscActionEntityAdd = KscActionEntityAdd;
//# sourceMappingURL=KscActionEntityAdd.js.map