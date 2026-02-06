"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("./Game/Manager/ModelManager");
const ConfigManager_1 = require("./Game/Manager/ConfigManager");
const MultiTextLang_1 = require("./Core/Define/ConfigQuery/MultiTextLang");
function getPropName(id) {
  try {
    const info = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(id);
    if (info) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(info.Name) ?? `Prop_${id}`;
    }
  } catch (e) {}
  return `Prop_${id}`;
}
function dumpStats() {
  const roles = [];
  const roleList = ModelManager_1.ModelManager.RoleModel.GetRoleList();
  for (const role of roleList) {
    const roleId = role.GetDataId();
    const roleName = role.GetName();
    const level = role.GetLevelData().GetLevel();
    const breachLevel = role.GetLevelData().GetBreachLevel();

    // Weapon
    let weaponInfo = null;
    const weaponData = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(roleId);
    if (weaponData) {
      weaponInfo = {
        Name: ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfig(weaponData.GetConfigId())?.WeaponName ?? "Unknown",
        Level: weaponData.GetLevel(),
        ResonanceLevel: weaponData.GetResonanceLevel()
      };
    }

    // Echoes (Phantoms)
    const echoes = [];
    const phantomBattleData = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(roleId);
    if (phantomBattleData) {
      const equippedPhantoms = phantomBattleData.GetIncrIdList();
      for (const incrId of equippedPhantoms) {
        if (incrId === 0) {
          continue;
        }
        const phantom = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(incrId);
        if (phantom) {
          const phantomConfig = phantom.GetConfig();
          const mainProps = phantom.GetMainPropShowAttributeList(1);
          const subProps = phantom.GetSubPropShowAttributeList(1);
          echoes.push({
            Name: phantomConfig?.MonsterName ?? "Unknown",
            Cost: phantom.GetCost(),
            Level: phantom.GetPhantomLevel(),
            Quality: phantom.GetQuality(),
            MainProps: mainProps.map(p => ({
              Id: p.Id,
              Name: getPropName(p.Id),
              Value: p.BaseValue,
              IsRatio: p.IsRatio
            })),
            SubProps: subProps.map(p => ({
              Id: p.Id,
              Name: getPropName(p.Id),
              Value: p.BaseValue,
              IsRatio: p.IsRatio
            }))
          });
        }
      }
    }
    roles.push({
      Name: roleName,
      Id: roleId,
      Level: level,
      Breach: breachLevel,
      Weapon: weaponInfo,
      Echoes: echoes
    });
  }
  const jsonOutput = JSON.stringify(roles, null, 2);
  const savePath = UE.BlueprintPathsLibrary.ProjectSavedDir() + "RoleStatsDump.json";
  const success = UE.KuroStaticLibrary.SaveStringToFile(jsonOutput, savePath, true);
  console.log(`[DumpStats] Saved to: ${savePath}, Success: ${success}`);
  return savePath;
}
exports.dumpStats = dumpStats;