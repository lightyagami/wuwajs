"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EffectConfigById_1 = require("../../Core/Define/ConfigQuery/EffectConfigById");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const EffectSystem_1 = require("../Effect/EffectSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
class EffectUtil {
  static GetEffectPath(e) {
    return EffectConfigById_1.configEffectConfigById.GetConfig(e).Path;
  }
  static SpawnUiEffect(e, t, f = new UE.TransformDouble(), i) {
    e = EffectUtil.GetEffectPath(e);
    return EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, f, e, t, undefined, 1);
  }
  static GetPreviewReplaceEffectPath(e) {
    var t = e;
    var f = UE.KuroEditorUtilityLibrary.GetAssetViewerSettings()?.Profiles.Get(0)?.EffectReplaceDataTable;
    if (f) {
      f = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(f);
      if (f.length) {
        for (const n of f) {
          var i = n.NewEffect?.ToAssetPathName();
          if (i?.length && i !== "None") {
            if (n.OldEffect?.ToAssetPathName() === t) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Audio", 4, "[Game.AnimNotify]预览找到替换列表的资源，替换为", ["NewPath", i]);
              }
              return i;
            }
          }
        }
      }
    }
    return e;
  }
  static RefreshAdditionTimeScale(e, t) {
    if (t?.Valid && (t = t.GetTopForeverTimeScaleConfig(0))) {
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(t.SourceType, e, t.TimeDilation);
    }
  }
  static SetEffectTimeScale(e, t, f, i = 0) {
    var n = t.FreezeTimeScale;
    EffectSystem_1.EffectSystem.SetTimeScale(e, n * f, true);
    if (i === 0) {
      EffectUtil.RefreshAdditionTimeScale(e, t);
    } else {
      n = ModelManager_1.ModelManager.CharacterModel?.InverseSelfCenteredTimeDilation ?? 1;
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, e, n);
    }
  }
  static SetAdditionalEffectTimeScaleByEntity(e, t) {
    var f;
    if (e?.Valid && (f = e.Entity.GetComponent(133))?.Valid) {
      EffectUtil.SetEffectTimeScale(t, f, e.Entity.TimeDilation);
    }
  }
  static ListenForeverTimeScale(e, t) {
    const f = () => {
      if (EffectSystem_1.EffectSystem.IsValid(e)) {
        EffectUtil.RefreshAdditionTimeScale(e, t);
      }
    };
    const i = t.Entity;
    EventSystem_1.EventSystem.AddWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationAdd, f);
    EventSystem_1.EventSystem.AddWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationRemove, f);
    EffectSystem_1.EffectSystem.AddFinishCallback(e, e => {
      if (i.Valid && (EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationAdd, f) && EventSystem_1.EventSystem.RemoveWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationAdd, f), EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationRemove, f))) {
        EventSystem_1.EventSystem.RemoveWithTarget(i, EventDefine_1.EEventName.OnForeverTimeDilationRemove, f);
      }
    });
  }
}
exports.EffectUtil = EffectUtil;
//# sourceMappingURL=EffectUtil.js.map