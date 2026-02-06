"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsSplineActorData = exports.TipsActorData = exports.SundryModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TestModuleBridge_1 = require("../../Bridge/TestModuleBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class SundryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.AccountGmId = 0;
    this.SceneCheckOn = false;
    this.RoleMoveDebugLogOn = false;
    this.RoleFallingDebugLogOn = false;
    this.GuideTriggerName = "";
    this.GmBlueprintGmIsOpen = false;
    this.GmBlueprintGmWinDebugIsOpen = false;
    this.CurrentGmRunState = false;
    this.RunningGmName = "";
    this.CanOpenGmView = false;
    this.IsBlockTips = false;
    this.ZAm = new Set();
    this.ModuleDebugLevelMap = new Map();
    this.TipsActorDataMap = undefined;
    this.TipsSplineActorDataMap = undefined;
  }
  SetBlockTpDungeon(e, t) {
    if (e) {
      this.ZAm.add(t);
    } else {
      this.ZAm.delete(t);
    }
  }
  ForceSetBlockTpDungeon(e) {
    if (e) {
      this.ZAm.add(2);
    } else {
      this.ZAm.clear();
    }
  }
  IsBlockTpDungeon() {
    return this.ZAm.size > 0;
  }
  ChangeModuleDebugLevel(e, t) {
    if (t > 0) {
      this.ModuleDebugLevelMap.set(e, t);
    } else {
      this.ModuleDebugLevelMap.delete(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeModuleDebugLevel, e, t);
  }
  GetModuleDebugLevel(e) {
    return this.ModuleDebugLevelMap.get(e) ?? 0;
  }
  OnInit() {
    if (!Info_1.Info.IsBuildShipping) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
        if (e && e.GmBlueprintFunctionLib) {
          this.RIo = e.GmBlueprintFunctionLib;
        }
      });
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
        if (e && e.GmUniverseEditorFunctionLib) {
          this.UIo = e.GmUniverseEditorFunctionLib;
        }
      });
    }
    return true;
  }
  GetGmBlueprintFunctionLib() {
    return this.RIo;
  }
  GetGmUniverseEditorFunctionLib() {
    return this.UIo;
  }
}
exports.SundryModel = SundryModel;
class TipsActorData {
  constructor(e, t, s) {
    this.Id = e;
    this.InitTransform = t;
    this.InitParam = s;
    this.Actor = undefined;
  }
}
exports.TipsActorData = TipsActorData;
class TipsSplineActorData {
  constructor(e, t) {
    this.Id = e;
    this.PbDataId = t;
    this.Actor = undefined;
    this.SplineComp = undefined;
  }
}
exports.TipsSplineActorData = TipsSplineActorData;
//# sourceMappingURL=SundryModel.js.map