"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPrefabText = exports.predefPrefabSetting = exports.NEW_TAG = undefined;
const UE = require("ue");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConcertoResponseItem_1 = require("../../BattleUi/Views/ConcertoResponseItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
function setPrefabText(e, t) {
  var r = new StringBuilder_1.StringBuilder();
  const o = [];
  let i = [];
  const s = [];
  let a = 0;
  for (let e = 0; e < t.length;) {
    var n = t.indexOf("[", e);
    if (n === -1) {
      r.Append(t.substring(e, t.length));
      break;
    }
    r.Append(t.substring(e, n));
    var l = t.indexOf("]", n);
    if (!(n < l)) {
      r.Append(t.substring(n + 1, t.length));
      break;
    }
    n = t.substring(n + 1, l).split(",");
    if (n.length > 0) {
      o.push({
        PrefabKey: n[0],
        Args: n
      });
      var u = exports.predefPrefabSetting.get(n[0]);
      if (u) {
        var c = u.GetPrefabPathFunc(n);
        s.push(c.length);
        i = i.concat(c);
        e = l + 1;
        for (let e = 0; e < c.length; e++) {
          r.Append("<snidx=");
          r.Append(a);
          r.Append("/>");
          a++;
        }
      }
    }
  }
  LguiUtil_1.LguiUtil.LoadAndSetText(e, r.ToString(), i, i => {
    let a = 0;
    o.forEach((e, t, r) => {
      var o = exports.predefPrefabSetting.get(e.PrefabKey);
      if (o?.Callback) {
        o.Callback(i.slice(a, a + s[t]), e.Args);
      }
      a += s[t];
    });
  });
}
exports.NEW_TAG = "New:";
exports.predefPrefabSetting = new Map([["FightConcertoStateGuide", {
  GetPrefabPathFunc: () => {
    const r = [];
    ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true).forEach((e, t) => {
      r.push("/Game/Aki/UI/UIResources/UiFight/Prefabs/FightConcertoState.FightConcertoState");
    });
    return r;
  },
  Callback: (o, e) => {
    ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true).forEach((e, t) => {
      if (t < o.length) {
        const r = new ConcertoResponseItem_1.ConcertoResponseItem();
        r.CreateByActorAsync(o[t]).then(() => {
          r.Refresh(ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e.Id));
          o[t].GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(true);
        });
      }
    });
  }
}]]);
exports.setPrefabText = setPrefabText; //# sourceMappingURL=GuidePrefabDefine.js.map