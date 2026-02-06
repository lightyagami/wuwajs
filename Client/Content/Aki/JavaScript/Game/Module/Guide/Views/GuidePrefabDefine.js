"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPrefabText = exports.predefPrefabSetting = exports.NEW_TAG = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConcertoResponseItem_1 = require("../../BattleUi/Views/ConcertoResponseItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
function setPrefabText(e, r) {
  var t = new StringBuilder_1.StringBuilder();
  const o = [];
  let n = [];
  const a = [];
  let i = 0;
  for (let e = 0; e < r.length;) {
    var s = r.indexOf("[", e);
    if (s === -1) {
      t.Append(r.substring(e, r.length));
      break;
    }
    t.Append(r.substring(e, s));
    var u = r.indexOf("]", s);
    if (!(s < u)) {
      t.Append(r.substring(s + 1, r.length));
      break;
    }
    s = r.substring(s + 1, u).split(",");
    if (s.length > 0) {
      o.push({
        PrefabKey: s[0],
        Args: s
      });
      var g = exports.predefPrefabSetting.get(s[0]);
      if (g) {
        var l = g.GetPrefabPathFunc(s);
        a.push(l.length);
        n = n.concat(l);
        e = u + 1;
        for (let e = 0; e < l.length; e++) {
          t.Append("<snidx=");
          t.Append(i);
          t.Append("/>");
          i++;
        }
      } else if (LanguageSystem_1.LanguageSystem.PackageLanguage === CommonDefine_1.THAILAND_ISO639_1) {
        return;
      }
    } else if (LanguageSystem_1.LanguageSystem.PackageLanguage === CommonDefine_1.THAILAND_ISO639_1) {
      return;
    }
  }
  LguiUtil_1.LguiUtil.LoadAndSetText(e, t.ToString(), n, n => {
    let i = 0;
    o.forEach((e, r, t) => {
      var o = exports.predefPrefabSetting.get(e.PrefabKey);
      if (o?.Callback) {
        o.Callback(n.slice(i, i + a[r]), e.Args);
      }
      i += a[r];
    });
  });
}
exports.NEW_TAG = "New:";
exports.predefPrefabSetting = new Map([["FightConcertoStateGuide", {
  GetPrefabPathFunc: () => {
    const t = [];
    ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true).forEach((e, r) => {
      t.push("/Game/Aki/UI/UIResources/UiFight/Prefabs/FightConcertoState.FightConcertoState");
    });
    return t;
  },
  Callback: (o, e) => {
    ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true).forEach((e, r) => {
      if (r < o.length) {
        const t = new ConcertoResponseItem_1.ConcertoResponseItem();
        t.CreateByActorAsync(o[r]).then(() => {
          t.Refresh(ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e.Id));
          o[r].GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(true);
        });
      }
    });
  }
}]]);
exports.setPrefabText = setPrefabText; //# sourceMappingURL=GuidePrefabDefine.js.map