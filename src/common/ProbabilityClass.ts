class ProbabilityClass {
    public meterLevel:Array<any> = [
        {
            minHeight:0,
            maxHeight:400,
            levelName:[
                'normalSticketLevel',
                'norHorSticketLevel',
                'norWaterSticketLevel',
            ],
            levelRate:[0.5,0.4,0.1],
            maxDistance:40,
            minDistance:24
        },
        {
            minHeight:400,
            maxHeight:600,
            levelName:[
                'norSpringPropLevel',
                'norMushroomLevel',
                'horSticketLevel'
            ],
            levelRate:[0.5,0.4,0.1],
            maxDistance:50,
            minDistance:50
        },
        {
            minHeight:600,
            maxHeight:650,
            levelName:[
                'upDownSticketMove'
            ],
            levelRate:[1],
            maxDistance:60,
            minDistance:40
        },
        {
            minHeight:650,
            maxHeight:1000,
            levelName:[
                'norWaterSticketLevel',
                'norHorSticketLevel',
                'waterOneHitLeftRight',
                'norSpringPropLevel',
                'norSpringShoePropLevel',
                'upDownSticketMove'
            ],
            levelRate:[0.3,0.2,0.2,0.1,0.1,0.1],
            maxDistance:60,
            minDistance:40
        },
        {
            minHeight:1000,
            maxHeight:2000,
            levelName:[
                'norWaterSticketLevel',
                'norHorSticketLevel',
                'waterOneHitLeftRight',
                'norSpringPropLevel',
                'woodSticketLeftRight',
                'norMushroomLevel',
                'normalSticketLevel',
            ],
            levelRate:[0.2,0.2,0.2,0.1,0.1,0.1,0.1],
            maxDistance:50,
            minDistance:40
        },
        {
            minHeight:2000,
            maxHeight:2200,
            levelName:[
                'purpleMonsterLeftRight',
                'spiderWebAndNorLeftRight'
            ],
            levelRate:[0.5,0.5],
            maxDistance:50,
            minDistance:40
        },
        {
            minHeight:2200,
            maxHeight:4000,
            levelName:[
                'woodSticketLeftRight',
                'waterOneHitLeftRight',
                'norHorSticketLevel',
                'horSticketLevel',
                'normalSticketLevel'
            ],
            levelRate:[0.2,0.2,0.2,0.3,0.1],
            maxDistance:60,
            minDistance:40
        },
        {
            minHeight:4000,
            maxHeight:20000,
            levelName:[
                'oneHitSticketLeftRight',
                'norWingPropLevel',
                'norSpringPropLevel',
                'norRocketPropLevel',
                'greenMonsterLeftRight',
                'norSpringShoePropLevel',
                'normalSticketLevel'
            ],
            levelRate:[0.2,0.1,0.1,0.1,0.1,0.1,0.1],
            maxDistance:80,
            minDistance:40
        },
    ]
    public getLevelName(playMeter){
        let nowMeterIndex = this.getNowPropIndex(playMeter);
        let levelIndex = this.getRandomKey(nowMeterIndex);
        let levelName = this.meterLevel[nowMeterIndex].levelName[levelIndex];
        let minDistance = this.meterLevel[nowMeterIndex].minDistance;
        let maxDistance = this.meterLevel[nowMeterIndex].maxDistance;
        return {
            levelName:levelName,
            minDistance:minDistance,
            maxDistance:maxDistance
        }
    }

 	public getNowPropIndex(playMeter) {
		let meter = playMeter;
		let list = this.meterLevel;
		let len = list.length;
		let index = null;

		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight) {
				index = i;
				break;
			}
		}
        if(index === null) {
            let randomNum = Math.floor(Math.random()*list.length);
            if(randomNum>=list.length) {
                randomNum = list.length-1;
            }
            index = randomNum;
        }
		return index;
	}
    private getRandomKey(index){
		let randomNum = Math.random();
		let start = 0;
		let end = 0;
		let listKey = null;
        let percentageObj = this.meterLevel[index].levelRate;

        for(let i=0;i<percentageObj.length;i++) {
            end = start+ percentageObj[i];
            if(randomNum>start &&　randomNum<=end) {
				listKey = i;
				break;
			}
            start = end;
        }

		return listKey;
	}
    
    
}