"use strict";

var __decorate = this && this.__decorate || function (e, t, r, n) {
  var i;
  var o = arguments.length;
  var s = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (o < 3 ? i(s) : o > 3 ? i(t, r, s) : i(t, r)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLinkedAnimInstComponent = undefined;
const ue_1 = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
let CharacterLinkedAnimInstComponent = class CharacterLinkedAnimInstComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.CurrentActivate = 0;
  }
  static get Dependencies() {
    return [3, 215, 186];
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.AnimComp = this.Entity.GetComponent(186);
    return true;
  }
  SyncLinkGameplayAnimBlueprint(e) {
    if (this.CurrentActivate === e) {
      return false;
    }
    this.CurrentActivate = e;
    var t;
    var e = this.GetGameplayABPAssetPath(e);
    return e !== "" && (e = ResourceSystem_1.ResourceSystem.Load(e, ue_1.Class), (t = this.AnimComp?.Actor?.Mesh) && t.LinkAnimGraphByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY, e), !!t?.IsValid());
  }
  GetGameplayABPAssetPath(e) {
    if (e !== 0) {
      var t = this.ActorComp.Actor.DtGameplayAbpConfig;
      if (t) {
        for (const r of DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t)) {
          if (r.Type === e) {
            return r.AnimInstance?.ToAssetPathName() ?? "";
          }
        }
      }
    }
    return "";
  }
};
CharacterLinkedAnimInstComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(108)], CharacterLinkedAnimInstComponent);
exports.CharacterLinkedAnimInstComponent = CharacterLinkedAnimInstComponent; //# sourceMappingURL=CharacterLinkedAnimInstComponent.js.map