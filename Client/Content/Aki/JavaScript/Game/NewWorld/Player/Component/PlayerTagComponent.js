"use strict";

var PlayerTagComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var a = arguments.length;
  var s = a < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        s = (a < 3 ? r(s) : a > 3 ? r(t, o, s) : r(t, o)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerTagComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseTagComponent_1 = require("../../Common/Component/BaseTagComponent");
let PlayerTagComponent = PlayerTagComponent_1 = class PlayerTagComponent extends BaseTagComponent_1.BaseTagComponent {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
    this.TagContainerHasTag = super.HasTag.bind(this);
    this.OnAnyExactTagChanged = (e, t, o) => {
      PlayerTagComponent_1.kc_.Start();
      if (e !== undefined && o !== t) {
        for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(this.PlayerId)) {
          n.EntityHandle?.Entity?.GetComponent(209)?.TagContainer.UpdateExactTag(5, e, t - o);
        }
      }
      PlayerTagComponent_1.kc_.Stop();
    };
  }
  OnCreate() {
    this.TagContainer.AddAnyExactTagListener(this.OnAnyExactTagChanged);
    return true;
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0);
    this.PlayerId = e?.GetPlayerId() ?? 0;
    return true;
  }
  OnClear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 19, "清理编队tag", ["PlayerId", this.PlayerId]);
    }
    for (const e of this.TagContainer.GetAllExactTags()) {
      for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(this.PlayerId)) {
        t.EntityHandle?.Entity?.GetComponent(209)?.TagContainer.RemoveExactTag(5, e);
      }
    }
    return true;
  }
  GetEntity() {
    return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItem(this.PlayerId, {
      ParamType: 2,
      IsControl: true
    })?.EntityHandle?.Entity;
  }
  GetCurrentTagComponent() {
    return this.GetEntity()?.GetComponent(209);
  }
  HasTag(e) {
    return this.GetCurrentTagComponent()?.HasTag(e) ?? false;
  }
};
PlayerTagComponent.kc_ = Stats_1.Stat.Create("PlayerTagComponent.OnAnyExactTagChanged");
PlayerTagComponent = PlayerTagComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(204)], PlayerTagComponent);
exports.PlayerTagComponent = PlayerTagComponent; //# sourceMappingURL=PlayerTagComponent.js.map