"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameBudgetAllocatorConfigPcCreator = void 0;
const GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig");
class GameBudgetAllocatorConfigPcCreator {
  CreateNormalEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 500, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 500, 100),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 1e3, 500, 10),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 60, 2e3, 100),
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 1e3, 500, 10)
    }
  }
  CreateBossEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 5e3, 500),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 5e3, 500),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 120, 1500, 300),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 10, 5e3, 700),
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 60, 3e3, 300),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 120, 1500, 150),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 1, 1, 1),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, 5e3, 700),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 10, 3e3, 300),
      Cutscene_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 2, 5, 7e3, 700)
    }
  }
  CreateCharacterEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3e3, 300),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 3e3, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 120, 2e3, 200),
      Normal_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 2, 60, 5e3, 500),
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 120, 2e3, 200),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 120, 1e3, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 20, 3e3, 500),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 20, 5e3, 700),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 120, 2e3, 200)
    }
  }
  CreateNormalNpcEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 1e3, 200),
      Normal_Render: void 0,
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 240, 1e3, 100),
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 240, 1e3, 100)
    }
  }
  CreateSimpleNpcEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 20, 1e3, 200),
      Normal_Render: void 0,
      Normal_NotRendered: void 0,
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0
    }
  }
  CreateFightEffectConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1)
  }
  CreateEffectConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 180, 500, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 2e3, 300),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 200, 50),
      Normal_Fighting: void 0,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 300, 500, 50),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, 200, 20),
      Fighting_Fighting: void 0,
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 20, 4500, 500),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 120, 1e3, 50)
    }
  }
  CreateEffectImportanceConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 100, 3e4, 3e3),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 100, 5e4, 5e3),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 1e3, 100),
      Normal_Fighting: void 0,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 100, 5e3, 1e3),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, 500, 100),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 100, 5e3, 1e3),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 100, 5e4, 5e3),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, 1e3, 100)
    }
  }
  CreateStabilizeLowEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 10, 1, 1),
      Normal_Render: void 0,
      Normal_NotRendered: void 0,
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0
    }
  }
  CreateAlwaysTickHotfixConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1),
      Normal_Render: void 0,
      Normal_NotRendered: void 0,
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0
    }
  }
  CreateMoveSceneItemEntityConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 1e4, 5e3),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 1e4, 5e3),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 60, 500, 10),
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0
    }
  }
  CreatePlayerAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1)
  }
  CreateAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1)
  }
  CreateCameraAlwaysTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 1, 1, 1)
  }
  CreateIdleExecConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 30, 1, 1)
  }
  CreateHUDTickConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 3500, 500)
  }
  CreateCharacterRenderConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 7e3, 700),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, 7e3, 700),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, 1e3, 200),
      Normal_Fighting: void 0,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 60, 5e3, 500),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 300, 500, 200),
      Fighting_Fighting: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 2, 60, 13e3, 700),
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, 13e3, 1300),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, 500, 200)
    }
  }
  CreateBattleHeadViewConfig() {
    return new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 5, 3e3, 500)
  }
  CreateCollisionPlantConfig() {
    return {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 300, 100),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 3, 300, 100),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 3, 1, 1),
      Normal_Fighting: void 0,
      Fighting_Rendered: void 0,
      Fighting_NotRendered: void 0,
      Fighting_Fighting: void 0,
      Cutscene_Rendered: void 0,
      Cutscene_NotRendered: void 0
    }
  }
}
exports.GameBudgetAllocatorConfigPcCreator = GameBudgetAllocatorConfigPcCreator;
//# sourceMappingURL=GameBudgetAllocatorConfigPcCreator.js.map