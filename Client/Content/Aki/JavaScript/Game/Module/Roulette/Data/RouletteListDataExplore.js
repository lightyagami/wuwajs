"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteListDataExplore = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteMainViewProxy_1 = require("../ViewProxy/RouletteMainViewProxy");
const RouletteDefine_1 = require("./RouletteDefine");
const RouletteListDataBase_1 = require("./RouletteListDataBase");
class RouletteListDataExplore extends RouletteListDataBase_1.RouletteListDataBase {
  constructor() {
    super(...arguments);
    this.UGm = [[[1], 4, 0], [[2], 5, 0], [[3], 6, 0], [[4], 7, 0], [[5], 8, 0], [[6], 9, 0], [[7], 10, 0], [[8], 11, 2]];
    this.RouletteType = 0;
    this.Priority = 10;
    this.xGm = undefined;
    this.BGm = [];
    this.kGm = [];
    this.cB_ = new Map();
    this.uB_ = undefined;
    this.qGm = [];
    this.OGm = 0;
    this.GGm = 0;
    this.xie = (e, t) => {
      this.StopListenRelatedTags();
      this.FGm(e);
    };
    this._B_ = (e, t) => {
      var i;
      var r;
      if (this.xGm?.Entity?.GetComponent(205)) {
        i = this.BGm;
        (r = this.kGm)[i.indexOf(e)] = t;
        this.L5_(i, r);
      }
    };
  }
  GetRouletteIdList() {
    if (this.IsRouletteReplace()) {
      return this.qGm;
    } else {
      return this.RouletteIdListServer;
    }
  }
  GetExtraItemId() {
    if (this.IsRouletteReplace()) {
      return this.OGm;
    } else {
      return this.ExtraItemIdServer;
    }
  }
  GetEquipExploreSkillId() {
    return this.EquipExploreSkillIdServer;
  }
  Init() {
    this.gB_();
    this.sCe();
  }
  Clear() {
    this.aCe();
  }
  UpdateData(e) {
    this.RouletteIdListServer = e.KHn;
    var t = this.rfo();
    this.ExtraItemIdServer = e.QHn;
    var i = this.rfo();
    if (i) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemUpdate, this.GetExtraItemId());
    } else if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpecialItemUpdate, undefined);
    }
    this.EquipExploreSkillIdServer = e.$Ps;
    if (this.ExtraItemIdServer === 0 && this.EquipExploreSkillIdServer === 3001) {
      (i = this.GetRouletteListSaveData()).EquipExploreSkillId = 3002;
      ControllerHolder_1.ControllerHolder.RouletteController.SaveRouletteDataRequest(i);
    } else if (this.ExtraItemIdServer !== 0 && this.EquipExploreSkillIdServer === 3002) {
      (t = this.GetRouletteListSaveData()).EquipExploreSkillId = 3001;
      ControllerHolder_1.ControllerHolder.RouletteController.SaveRouletteDataRequest(t);
    }
  }
  IsActivate() {
    return true;
  }
  sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
  }
  aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
  }
  IsRouletteReplace() {
    return !!this.uB_;
  }
  IsRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
  }
  IsMainRouletteCanOpenView(e) {
    return ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(e);
  }
  CreateAssemblyGridData() {
    var e = new Map();
    e.set(0, this.efo());
    e.set(2, this.sfo());
    return e;
  }
  GetRouletteGridId(e, t, i) {
    switch (t) {
      case 0:
        return (i ? this.GetRouletteIdList() : this.RouletteIdListServer).at(e);
      case 2:
        if (i) {
          return this.GetExtraItemId();
        } else {
          return this.ExtraItemIdServer;
        }
    }
  }
  GetRouletteMainViewProxy() {
    return new RouletteMainViewProxy_1.RouletteMainViewProxy();
  }
  GetRouletteDataMap() {
    return this.UGm;
  }
  gB_() {
    this.cB_.clear();
    this.BGm.length = 0;
    this.kGm.length = 0;
    var e = [];
    for (const r of ConfigManager_1.ConfigManager.RouletteConfig.GetAllReplaceConfig()) {
      for (const o of r.TagsInForce) {
        var t;
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
        if (i) {
          t = {
            TagId: i,
            SortId: r.Priority,
            ReplaceId: r.Id
          };
          e.push(t);
          this.cB_.set(i, r.Id);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 37, "[ExploreRoulette] 探索工具轮盘替换配置Tag不存在,请检查配置", ["ReplaceId", r.Id], ["tagName", o]);
        }
      }
    }
    e.sort((e, t) => e.SortId - t.SortId);
    for (const s of e) {
      this.BGm.push(s.TagId);
      this.kGm.push(false);
    }
  }
  FGm(e) {
    var t = e?.Entity?.GetComponent(205);
    this.StopListenRelatedTags();
    var i = this.BGm;
    var r = this.kGm;
    for (let e = 0; e < i.length; e++) {
      var o = i[e];
      t?.AddTagAddOrRemoveListener(o, this._B_);
      r[e] = t?.HasTag(o) ?? false;
    }
    this.xGm = e;
    this.L5_(i, r);
  }
  StopListenRelatedTags() {
    var e = this.xGm;
    if (e) {
      var t = e.Entity?.GetComponent(205);
      if (t) {
        for (const i of this.BGm) {
          t.RemoveTagAddOrRemoveListener(i, this._B_);
        }
      }
      this.xGm = undefined;
    }
  }
  L5_(t, i) {
    for (let e = 0; e < i.length; e++) {
      var r;
      if (i[e]) {
        r = t[e];
        this.NGm(r);
        return;
      }
    }
    this.VGm();
  }
  NGm(t) {
    t = this.cB_.get(t);
    if (this.uB_ !== t) {
      this.uB_ = t;
      var t = ConfigManager_1.ConfigManager.RouletteConfig.GetReplaceConfigById(t);
      this.qGm.length = 0;
      this.qGm.push(...t.RouletteSkillIdList.slice(0, RouletteDefine_1.ROULETTE_NUM));
      var i = this.qGm.length;
      for (let e = 0; e < RouletteDefine_1.ROULETTE_NUM - i; e++) {
        this.qGm.push(0);
      }
      let e = t.RouletteItemId;
      if (!!e && !(ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0)) {
        e = 0;
      }
      this.OGm = e;
      this.GGm = this.EquipExploreSkillIdServer;
      t = t.ReplaceSkillId;
      if (t && this.IsFirstExplorePriority()) {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t, 0, "ActiveReplaceConfig");
        ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t, undefined, true);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[ExploreRoulette] 进入替换模式", ["ReplaceId", this.uB_], ["ReplaceSkillId", t], ["ReplaceItemId", e], ["RestoreSkillId", this.GGm]);
      }
    }
  }
  VGm() {
    var e;
    if (this.uB_) {
      this.uB_ = undefined;
      if ((e = this.GGm) && this.IsFirstExplorePriority()) {
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e, 0, "DisActiveReplaceConfig");
        ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e, undefined, true);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "[ExploreRoulette] 退出替换模式", ["RestoreSkillId", e]);
      }
      this.GGm = 0;
    }
  }
  rfo() {
    return !!this.GetExtraItemId() && ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(this.GetExtraItemId());
  }
  efo() {
    var e;
    var t;
    var i;
    var r = [];
    for ([e, t] of ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.entries()) {
      if (t.RouletteType.includes(this.RouletteType) && t.CanAssemblyShow) {
        (i = new RouletteDefine_1.AssemblyExploreGridData()).GridType = 0;
        i.IconPath = t.BackGround;
        i.Name = t.Name;
        i.Id = e;
        i.SortId = t.Sort.get(this.RouletteType) ?? 0;
        r.push(i);
      }
    }
    r.sort((e, t) => e.SortId - t.SortId);
    return r;
  }
  sfo() {
    var e = [];
    for (const o of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(13)) {
      var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(o.GetConfigId());
      if (t && t.SpecialItemType === 0) {
        (t = new RouletteDefine_1.AssemblyEquipItemGridData()).Id = o.GetConfigId();
        t.GridType = 2;
        t.Name = o.GetConfig().Name;
        t.ItemNum = o.GetCount();
        t.ItemType = 13;
        t.SortId = o.GetSortIndex();
        t.QualityId = o.GetQuality();
        e.push(t);
      }
    }
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("Roulette_EquipItem_ShowTypeList");
    for (const s of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(1)) {
      var r = s.GetConfig().ItemBuffType;
      if (i.includes(r)) {
        (r = new RouletteDefine_1.AssemblyEquipItemGridData()).Id = s.GetConfigId();
        r.GridType = 2;
        r.Name = s.GetConfig().Name;
        r.ItemNum = s.GetCount();
        r.ItemType = 1;
        r.SortId = s.GetSortIndex();
        r.QualityId = s.GetQuality();
        e.push(r);
      }
    }
    return e;
  }
}
exports.RouletteListDataExplore = RouletteListDataExplore;
//# sourceMappingURL=RouletteListDataExplore.js.map