"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDataBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FormationPropertyById_1 = require("../../../../Core/Define/ConfigQuery/FormationPropertyById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttrListScrollData_1 = require("../View/ViewData/FormationAttrListScrollData");
const RoleAttrListScrollData_1 = require("../View/ViewData/RoleAttrListScrollData");
const RoleAttributeData_1 = require("./Module/RoleAttributeData");
const RoleAudioData_1 = require("./Module/RoleAudioData");
const RoleFavorData_1 = require("./Module/RoleFavorData");
const RoleLevelData_1 = require("./Module/RoleLevelData");
const RolePhantomData_1 = require("./Module/RolePhantomData");
const RoleResonanceData_1 = require("./Module/RoleResonanceData");
const RoleSkillData_1 = require("./Module/RoleSkillData");
class RoleDataBase {
  constructor(e) {
    this.RoleModelConfig = undefined;
    this.t_o = new Map();
    this.i_o = [RoleLevelData_1.RoleLevelData, RoleAttributeData_1.RoleAttributeData, RoleSkillData_1.RoleSkillData, RoleResonanceData_1.RoleResonanceData, RolePhantomData_1.RolePhantomData, RoleAudioData_1.RoleAudioData, RoleFavorData_1.RoleFavorData];
    this.BIl = -1;
    this.CKc = true;
    this.SortAttrList = (e, t) => {
      var a = e.Priority !== 0;
      var r = t.Priority !== 0;
      if (a && r) {
        return e.Priority - t.Priority;
      } else if (a) {
        return -1;
      } else if (r) {
        return 1;
      } else {
        return e.Id - t.Id;
      }
    };
    this.Id = e;
    this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(this.GetRoleConfig().Name);
    this.o_o();
  }
  o_o() {
    var e = this.GetRoleId();
    for (const t of this.i_o) {
      this.t_o.set(t, new t(e));
    }
  }
  GetLevelData() {
    return this.t_o.get(RoleLevelData_1.RoleLevelData);
  }
  GetAttributeData() {
    return this.t_o.get(RoleAttributeData_1.RoleAttributeData);
  }
  GetSkillData() {
    return this.t_o.get(RoleSkillData_1.RoleSkillData);
  }
  GetResonanceData() {
    return this.t_o.get(RoleResonanceData_1.RoleResonanceData);
  }
  GetPhantomData() {
    return this.t_o.get(RolePhantomData_1.RolePhantomData);
  }
  GetAudioData() {
    return this.t_o.get(RoleAudioData_1.RoleAudioData);
  }
  GetFavorData() {
    return this.t_o.get(RoleFavorData_1.RoleFavorData);
  }
  SetRoleSkinId(e) {
    this.BIl = e;
  }
  GetRoleSkinId() {
    if (this.BIl <= 0) {
      return this.GetRoleConfig().SkinId;
    } else {
      return this.BIl;
    }
  }
  SetBackgroundMusicEnabled(e) {
    this.CKc = e;
  }
  GetBackgroundMusicEnabled() {
    return this.CKc;
  }
  GetElementInfo() {
    var e = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(e.ElementId);
  }
  GetQualityConfig() {
    var e = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(e.QualityId);
  }
  GetRoleConfig() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.GetRoleId());
  }
  GetRoleSkillTreeConfig() {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.GetRoleId());
    if (e) {
      return ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeListByGroupId(e.SkillTreeGroupId);
    }
  }
  GetDataId() {
    return this.Id;
  }
  GetShowAttrList() {
    let a = new Array();
    var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexList();
    if (e) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
        ParamType: 0,
        OnlyMyRole: true
      });
      var r = t ? t.EntityHandle.Entity.GetComponent(177) : undefined;
      for (const i of e) {
        if (i.IsShow) {
          let e = 0;
          let t = 0;
          t = r ? (e = r.GetBaseValue(i.Id) ?? 0, r.GetCurrentValue(i.Id) - e ?? 0) : (o = this.GetAttributeData(), e = o.GetRoleBaseAttr(i.Id), o.GetRoleAddAttr(i.Id));
          var o = new RoleAttrListScrollData_1.RoleAttrListScrollData(i.Id, e, t, i.Priority, false, 0);
          a.push(o);
        }
      }
      t = this.y3l();
      (a = a.concat(t)).sort(this.SortAttrList);
    }
    return a;
  }
  y3l() {
    var e = new Array();
    for (const r of [10]) {
      var t;
      var a = FormationPropertyById_1.configFormationPropertyById.GetConfig(r);
      if (a && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(a.Condition.toString(), undefined) && (t = ModelManager_1.ModelManager.FormationAttributeModel.GetData(r))) {
        t = new FormationAttrListScrollData_1.FormationAttrListScrollData(r, t.Max / 100, 0, a.Priority, false, 0);
        e.push(t);
      }
    }
    return e;
  }
  GetShowAttributeValueById(e) {
    var t;
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
      ParamType: 0,
      OnlyMyRole: true
    });
    var a = a ? a.EntityHandle?.Entity?.GetComponent(177) : undefined;
    let r = 0;
    if (a) {
      if ((r = a.GetCurrentValue(e)) === 0 && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 43, "角色界面获取实体属性值为0", ["id", e]);
      }
    } else {
      t = (a = this.GetAttributeData()).GetRoleBaseAttr(e);
      a = a.GetRoleAddAttr(e);
      if ((r = t + a) === 0 && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 43, "角色界面从服务器获取的属性值为0", ["id", e], ["baseAttr", t], ["addAttr", a]);
      }
    }
    return r;
  }
  GetBaseAttributeValueById(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Id, {
      ParamType: 0,
      OnlyMyRole: true
    });
    var t = t ? t.EntityHandle.Entity.GetComponent(177) : undefined;
    let a = 0;
    return a = t ? t.GetBaseValue(e) : this.GetAttributeData().GetRoleBaseAttr(e);
  }
  TryRemoveNewFlag() {
    return false;
  }
}
exports.RoleDataBase = RoleDataBase;
//# sourceMappingURL=RoleDataBase.js.map