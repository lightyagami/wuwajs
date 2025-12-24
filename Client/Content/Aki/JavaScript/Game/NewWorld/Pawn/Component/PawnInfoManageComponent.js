"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var r;
  var o = arguments.length;
  var s = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnInfoManageComponent = undefined;
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SOCKET_NAME = "MarkCase";
let PawnInfoManageComponent = class PawnInfoManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.he = "";
    this.Om1 = undefined;
    this.qm1 = undefined;
    this.Ovr = undefined;
    this.han = undefined;
    this.lan = undefined;
    this._an = -1;
    this.Aif = undefined;
    this.xrr = undefined;
    this.KQs = undefined;
  }
  OnInit() {
    this.Ovr = this.Entity.GetComponent(0);
    this.han = this.Entity.GetComponent(158);
    return true;
  }
  get LockRange() {
    return this._an;
  }
  get LockControl() {
    return this.Aif;
  }
  get PawnName() {
    if (this.xrr !== LanguageSystem_1.LanguageSystem.PackageLanguage) {
      this.oCo();
    }
    return this.he;
  }
  set PawnName(t) {
    this.he = t;
  }
  get SecondName() {
    return this.Om1;
  }
  get FunctionIcon() {
    return this.qm1;
  }
  UpdateNameAndHeadInfo() {
    this.oCo();
    this.Gm1();
  }
  GetPawnNameKey() {
    return this.KQs;
  }
  SetPawnNameKey(t) {
    this.KQs = t;
    this.oCo();
  }
  oCo() {
    var t;
    this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage;
    if (this.KQs) {
      this.he = ConfigManager_1.ConfigManager.TextConfig.GetTextById(this.KQs);
    } else if (this.han?.DropItemConfig) {
      t = this.han.DropItemConfig.Config;
      this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
    } else if (t = this.Ovr?.GetEntityTidName()) {
      this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    }
  }
  Gm1() {
    var t = this.Ovr?.GetBaseInfo()?.HeadInfo;
    var t = t ? ConfigManager_1.ConfigManager.NpcIconConfig?.GetNpcHeadInfo(t) : undefined;
    this.Om1 = this.Ovr?.GetEntitySecondName();
    this.Om1 ||= t?.SecondName;
    this.qm1 = this.Ovr?.GetEntityFunctionIcon();
    this.qm1 ||= t?.FunctionPath;
  }
  get DropItemId() {
    return this.han?.DropItemConfig?.ConfigId;
  }
  get DropItemCount() {
    return this.han?.DropItemConfig.ItemCount;
  }
  get EntityId() {
    return this.Entity.Id;
  }
  get HasQuestOption() {
    var t = this.Entity.GetComponent(207);
    return !!t && !!(t = t.GetInteractController()) && t.HasDynamicOption;
  }
  uan() {
    var t;
    this.lan = this.Ovr.GetPbEntityInitData();
    if (this.lan) {
      t = this.Ovr.GetBaseInfo();
      this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName);
      if (t = (0, IComponent_1.getComponent)(this.lan.ComponentsData, "FightInteractComponent")) {
        this._an = t.LockRange;
        this.Aif = t.LockControl ?? undefined;
      } else {
        this._an = -1;
        this.Aif = undefined;
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 28, "[清理CDT_EntityConfig]该实体没有对应的Pb表信息", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["TidName", this.Ovr.GetBaseInfo()?.TidName], ["PbDataId", this.Ovr.GetPbDataId()]);
      }
      return false;
    }
  }
  OnStart() {
    if (this.uan()) {
      this.oCo();
    }
    return true;
  }
  IsDropItem() {
    return this.han !== undefined;
  }
  GetHeadStateSocketName() {
    var t = this.Entity.GetComponent(0)?.GetBaseInfo()?.HeadStateViewConfig?.HeadStateSocketName;
    return t || SOCKET_NAME;
  }
  GetHeadStateOffset() {
    var t = this.Ovr.GetBaseInfo()?.HeadStateViewConfig?.ZOffset;
    return t || ((t = this.Entity.GetComponent(0)?.GetModelConfig()) ? t.名字Z偏移 : 0);
  }
};
PawnInfoManageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(126)], PawnInfoManageComponent);
exports.PawnInfoManageComponent = PawnInfoManageComponent; //# sourceMappingURL=PawnInfoManageComponent.js.map