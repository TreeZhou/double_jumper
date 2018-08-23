class CalculatePonitXY {  // 设计好关卡的点

    constructor (){
    }
    public allPropsClass:Object = {
			woodSticket: WoodSticket,
			waterSticket: WaterSticket,
			normalSticket:NormalSticket,
            leafSticket:LeafSticket,
            cloudSticket:CloudSticket,
            monsterProp:Monster,
            mushroomProp:Mushroom,
            rocketProp:Rocket,
            spiderWebProp:SpiderWeb,
            springProp:Spring,
            springShoeProp:SpringShoe,
            wingProp:Wing
	}
    public allPropsPool:Object = {
			woodSticket: [],
			waterSticket: [],
			normalSticket:[],
            leafSticket:[],
            cloudSticket:[],
            monsterProp:[],
            mushroomProp:[],
            rocketProp:[],
            spiderWebProp:[],
            springProp:[],
            springShoeProp:[],
            wingProp:[]
	}

    private createSkinObj(recycleName:string,fatherObj?:any){
		let item = null;
        let propsList = this.allPropsPool[recycleName];
        let objClass = this.allPropsClass[recycleName];
		if(propsList.length) {
			item = this.allPropsPool[recycleName][0];
			this.allPropsPool[recycleName].shift();

		}else {
            if(fatherObj) {
                item = new objClass(fatherObj);
            }else {
                item = new objClass();
            }
			
		}

		return item;
	}
    private randomObjX(stageWidth:number,objWidth:number){
        let randomX = 0;

        randomX = Math.random() * (stageWidth-objWidth);
        return randomX;
    }
    private setRandomDistance(maxDiastance,minDistance){
        let random = Math.ceil(Math.abs(Math.random() * (maxDiastance - minDistance)) + minDistance);
        return random;
    }
    /**
     * 创建跳板和道具对象，存入数组 
     */
    public getCreateClassList(recycleNameList:Array<any>,createNum:number,maxDiastance:number,minDistance:number){
        let list = [];
        let item = null;
        for(let i=0; i<createNum;i++) {
            for(let j=0;j<recycleNameList.length;j++) {
                item = this.createSkinObj(recycleNameList[j]);
                list.push({
                    roleObj:item,
                    maxDistance:maxDiastance,
                    minDistance:minDistance
                });
            }
           
        }
        return list;
    }
    /**
     * 单个跳板和单个道具的结合
     */
    public singleSticketAndProp(recycleNameList:Array<any>,createNum:number,maxDiastance:number,minDistance:number){
        let listLength = recycleNameList.length;
        let item = null;
        let propItem = null;
        let list = [];
        if(listLength) {
            for(let i=0; i<createNum;i++) {
             item = this.createSkinObj(recycleNameList[0]);
             propItem = this.createSkinObj(recycleNameList[1],item);
             item.addChild(propItem);
            list.push({
                roleObj:item,
                maxDistance:maxDiastance,
                minDistance:minDistance
            });
            }
        }
        return list;
    }
    /**
     * 存入回收的数据
     */
    public recycleObj(obj,typeName){
        this.allPropsPool[typeName].push(obj);
    }

    /**
     *设计关卡点的XY
     */

    /**
     *随机位置的关卡点 
      pointList:[{
        roleObj:any,
        maxDistance:number,
        minDistance:number
    }]
     */
    public randomPointXY(pointList:Array<any>,lastY:number,stageW:number){
        let listLength = pointList.length;
        let preY = lastY;
        let item = null;
        if(listLength) {
            for(let i=0;i<listLength;i++) {
                item = pointList[i];
                item.roleObj.x = this.randomObjX(stageW,item.roleObj.width);
                item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                preY = item.roleObj.y;
            }
        }
        return pointList;
    }
 


}