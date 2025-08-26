"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterDebugUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PreloadControllerNew_1 = require("../../World/Controller/PreloadControllerNew");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
class CharacterDebugUtil {
  static LoadFightDtDebug(e = 0) {
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    let r = [];
    for (const o of r = e ? [e] : ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (o.IsInit) {
        this.LoadCharacterFightDtNewPreload(o.Entity).then(() => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "测试加载战斗DT完成", ["entityId", o.Entity.Id]);
          }
        }, e => {});
      }
    }
  }
  static async LoadCharacterFightDtNewPreload(e) {
    var r = e.GetComponent(0);
    var o = e.GetComponent(40);
    var a = e.GetComponent(208);
    var t = e.GetComponent(1);
    var l = e.GetComponent(209);
    var i = ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(r.GetCreatureDataId());
    if (i) {
      var e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(t.Actor.GetClass());
      var r = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e);
      var n = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(r);
      if (n) {
        o.DtSkillInfoMapForDebug.set(0, o.DtSkillInfo);
        o.DtSkillInfoExtraList = [];
        o.DtBulletInfoExtraList = [];
        o.DtHitEffectExtraList = [];
        for (let e = 0; e < n.SkillDataTableMap.Num(); ++e) {
          var s = n.SkillDataTableMap.GetKey(e);
          var g = n.SkillDataTableMap.Get(s)?.ToAssetPathName();
          if (g && g.length > 0 && g !== "None") {
            if (g = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable)) {
              o.DtSkillInfoExtraList.push(g);
            }
            o.DtSkillInfoMapForDebug.set(s, g);
          }
          var g = n?.BulletDataTableMap.Get(s)?.ToAssetPathName();
          if (g && g.length > 0 && g !== "None") {
            g = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable);
            if (g) {
              o.DtBulletInfoExtraList.push(g);
              var _ = new Array();
              DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(g, _);
              for (const c of _) {
                var d = BigInt(c);
                PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(i, d);
              }
            }
          }
          g = n?.HitEffectTableMap.Get(s)?.ToAssetPathName();
          if (g && g.length > 0 && g !== "None" && (_ = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable))) {
            o.DtHitEffectExtraList.push(_);
          }
          s = new GameModePromise_1.GameModePromise();
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(i.MainAsset, i.LoadPriority, false, s);
          await s.Promise;
          for (const M of o.GetAllSkillData(4)) {
            var u = o.GetSkillInfo(M);
            if (u) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 17, "【debug】加载额外技能", ["skillId", M]);
              }
              o.GiveSkillDebug(M);
              l.AddSkillTriggerDebug(M, u);
              a.InitSkillCdBySkillInfo(M, u);
            }
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 17, "找不到当前角色的FightInfo配置", ["actorPath", r]);
      }
    }
  }
}
exports.CharacterDebugUtil = CharacterDebugUtil;
//# sourceMappingURL=CharacterDebugUtil.js.map