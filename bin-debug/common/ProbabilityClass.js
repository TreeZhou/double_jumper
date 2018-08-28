var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProbabilityClass = (function () {
    function ProbabilityClass() {
        this.meterLevel = [
            {
                minHeight: 0,
                maxHeight: 400,
                levelName: [
                    'normalSticketLevel',
                    'norHorSticketLevel',
                    'norWaterSticketLevel',
                ],
                levelRate: [0.5, 0.4, 0.1],
                maxDistance: 40,
                minDistance: 24
            },
            {
                minHeight: 400,
                maxHeight: 600,
                levelName: [
                    'norSpringPropLevel',
                    'norMushroomLevel',
                    'horSticketLevel'
                ],
                levelRate: [0.5, 0.4, 0.1],
                maxDistance: 50,
                minDistance: 50
            },
            {
                minHeight: 700,
                maxHeight: 1000,
                levelName: [
                    'norWaterSticketLevel',
                    'norHorSticketLevel',
                    'waterOneHitLeftRight',
                    'norSpringPropLevel',
                    'norSpringShoePropLevel'
                ],
                levelRate: [0.4, 0.2, 0.2, 0.1, 0.1],
                maxDistance: 60,
                minDistance: 40
            },
            {
                minHeight: 1000,
                maxHeight: 2000,
                levelName: [
                    'norWaterSticketLevel',
                    'norHorSticketLevel',
                    'waterOneHitLeftRight',
                    'norSpringPropLevel',
                    'woodSticketLeftRight',
                    'norMushroomLevel',
                    'normalSticketLevel',
                ],
                levelRate: [0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1],
                maxDistance: 50,
                minDistance: 40
            },
            {
                minHeight: 2000,
                maxHeight: 2200,
                levelName: [
                    'purpleMonsterLeftRight',
                    'spiderWebAndNorLeftRight'
                ],
                levelRate: [0.5, 0.5],
                maxDistance: 50,
                minDistance: 40
            },
            {
                minHeight: 2200,
                maxHeight: 4000,
                levelName: [
                    'woodSticketLeftRight',
                    'waterOneHitLeftRight',
                    'norHorSticketLevel',
                    'horSticketLevel',
                    'normalSticketLevel'
                ],
                levelRate: [0.2, 0.2, 0.2, 0.3, 0.1],
                maxDistance: 60,
                minDistance: 40
            },
            {
                minHeight: 4000,
                maxHeight: 20000,
                levelName: [
                    'oneHitSticketLeftRight',
                    'norWingPropLevel',
                    'norSpringPropLevel',
                    'norRocketPropLevel',
                    'greenMonsterLeftRight',
                    'norSpringShoePropLevel',
                    'normalSticketLevel'
                ],
                levelRate: [0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                maxDistance: 80,
                minDistance: 40
            },
        ];
    }
    ProbabilityClass.prototype.getLevelName = function (playMeter) {
        var nowMeterIndex = this.getNowPropIndex(playMeter);
        var levelIndex = this.getRandomKey(nowMeterIndex);
        var levelName = this.meterLevel[nowMeterIndex].levelName[levelIndex];
        var minDistance = this.meterLevel[nowMeterIndex].minDistance;
        var maxDistance = this.meterLevel[nowMeterIndex].maxDistance;
        return {
            levelName: levelName,
            minDistance: minDistance,
            maxDistance: maxDistance
        };
    };
    ProbabilityClass.prototype.getNowPropIndex = function (playMeter) {
        var meter = playMeter;
        var list = this.meterLevel;
        var len = list.length;
        var index = null;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight) {
                index = i;
                break;
            }
        }
        if (index === null) {
            var randomNum = Math.floor(Math.random() * list.length);
            if (randomNum >= list.length) {
                randomNum = list.length - 1;
            }
            index = randomNum;
        }
        return index;
    };
    ProbabilityClass.prototype.getRandomKey = function (index) {
        var randomNum = Math.random();
        var start = 0;
        var end = 0;
        var listKey = null;
        var percentageObj = this.meterLevel[index].levelRate;
        for (var i = 0; i < percentageObj.length; i++) {
            end = start + percentageObj[i];
            if (randomNum > start && randomNum <= end) {
                listKey = i;
                break;
            }
            start = end;
        }
        return listKey;
    };
    return ProbabilityClass;
}());
__reflect(ProbabilityClass.prototype, "ProbabilityClass");
