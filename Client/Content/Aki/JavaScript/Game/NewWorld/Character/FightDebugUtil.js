"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightDebugUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PreloadControllerNew_1 = require("../../World/Controller/PreloadControllerNew");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
class FightDebugUtil {
  static LoadFightDtDebug(e = 0) {
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    let o = [];
    for (const r of o = e ? [e] : ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (r.IsInit) {
        this.LoadCharacterFightDtNewPreload(r.Entity).then(() => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "测试加载战斗DT完成", ["entityId", r.Entity.Id]);
          }
        }, e => {});
      }
    }
  }
  static async LoadCharacterFightDtNewPreload(e) {
    var o = e.GetComponent(0);
    var r = e.GetComponent(40);
    var t = e.GetComponent(211);
    var a = e.GetComponent(1);
    var i = e.GetComponent(212);
    var n = ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(o.GetCreatureDataId());
    if (n) {
      var e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(a.Actor.GetClass());
      var o = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e);
      var l = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(o);
      if (l) {
        r.DtSkillInfoMapForDebug.set(0, r.DtSkillInfo);
        r.DtSkillInfoExtraList = [];
        r.DtBulletInfoExtraList = [];
        r.DtHitEffectExtraList = [];
        for (let e = 0; e < l.SkillDataTableMap.Num(); ++e) {
          var s = l.SkillDataTableMap.GetKey(e);
          var g = l.SkillDataTableMap.Get(s)?.ToAssetPathName();
          if (g && g.length > 0 && g !== "None") {
            if (g = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable)) {
              r.DtSkillInfoExtraList.push(g);
            }
            r.DtSkillInfoMapForDebug.set(s, g);
          }
          var g = l?.HitEffectTableMap.Get(s)?.ToAssetPathName();
          if (g && g.length > 0 && g !== "None" && (s = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable))) {
            r.DtHitEffectExtraList.push(s);
          }
          var g = new GameModePromise_1.GameModePromise();
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(n.MainAsset, n.LoadPriority, false, g);
          await g.Promise;
          for (const f of r.GetAllSkillId(4)) {
            var _ = r.GetSkillInfo(f);
            if (_) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "【debug】加载额外技能", ["skillId", f]);
              }
              r.GiveSkillDebug(f);
              i.AddSkillTriggerDebug(f, _);
              t.InitSkillCdBySkillInfo(f, _);
            }
          }
        }
        for (let e = 0; e < l.BulletDataTableMap.Num(); e++) {
          var u = l.SkillDataTableMap.GetKey(e);
          var u = l?.BulletDataTableMap.Get(u)?.ToAssetPathName();
          if (u && u.length > 0 && u !== "None") {
            u = ResourceSystem_1.ResourceSystem.Load(u, UE.DataTable);
            if (u) {
              r.DtBulletInfoExtraList.push(u);
              var c = new Array();
              DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(u, c);
              for (const m of c) {
                var d = BigInt(m);
                PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(n, d);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 17, "找不到当前角色的FightInfo配置", ["actorPath", o]);
      }
    }
  }
  static SetFightDtTypeForDebug(e = 0) {
    var o;
    if (e !== this.DtSkillTypeForDebug) {
      this.DtSkillTypeForDebug = e;
      (o = new Protocol_1.Aki.Protocol.Gzn()).VVn = 0;
      o.P8n = "@ChangeInstFightInfoDtType " + e;
      Net_1.Net.Call(22424, Protocol_1.Aki.Protocol.Gzn.create(o), () => {});
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetFightDtTypeForDebug);
    }
  }
}
(exports.FightDebugUtil = FightDebugUtil).DtSkillTypeForDebug = 0;
//# sourceMappingURL=FightDebugUtil.js.map