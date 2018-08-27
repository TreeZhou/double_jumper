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
            wingProp:Wing,
            protectionProp:ProtectionProp,
            bulletProp:Bullet
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
            wingProp:[],
            protectionProp:[],
            bulletProp:[]
	}

    public createSkinObj(recycleName:string,fatherObj?:any){
		let item = null;
        let propsList = this.allPropsPool[recycleName];
        let objClass = this.allPropsClass[recycleName];
		if(this.allPropsPool[recycleName].length) {
			item = this.allPropsPool[recycleName][0];
			this.allPropsPool[recycleName].shift();
            item.resertData();
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
    private randomMinX(distanceW:number,minW:number,objWidth:number){
          let randomX = 0;
            randomX = Math.random() * (distanceW-objWidth)+minW;
            return randomX;
    }
    private randomIsLeftRightX(stageWidth:number,objWidth:number,isLeft:boolean){
        let randomX = 0;
        if(isLeft) {
            randomX =  Math.random() * (stageWidth/2-objWidth);
        }else {
            randomX =  Math.random() * (stageWidth/2-objWidth)+stageWidth/2;
        }

        return randomX;
    }
    private setRandomDistance(maxDiastance,minDistance){
        let random = Math.ceil(Math.abs(Math.random() * (maxDiastance - minDistance)) + minDistance);
        return random;
    }
    public checkIsHasChildHeight(item){
        let height = 0;
        // console.log('高度1',item);
        if(item.$children[1]) {
            height = item.$children[1].height;
            // console.log('高度2',height);
        }

        return height;
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
     * 创建怪兽的对象
     */
    public createMonster(recycleName:string,monsterType:string,maxDiastance:number,minDistance:number){
        let list = [];
        let item = null;
        item = this.createSkinObj(recycleName,monsterType);
        list.push({
                roleObj:item,
                maxDistance:maxDiastance,
                minDistance:minDistance
        });
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
                preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
            }
        }
        return pointList;
    }

    /**
     * 左右左右的位置关卡点
     */
    public leftAndRightPointXY(pointList:Array<any>,lastY:number,stageW:number){
        let listLength = pointList.length;
        let preY = lastY;
        let item = null;
        let random = Math.random();
        let isLeft = random>0.5?false:true;
        if(listLength) {
            for(let i=0;i<listLength;i++) {
                item = pointList[i];
                item.roleObj.x = this.randomIsLeftRightX(stageW,item.roleObj.width,isLeft);
                item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                // console.log(item.roleObj.height );
                isLeft = !isLeft;
            }
        }
        return pointList;
    }

    /**
     * 怪兽关卡点
     */
    public monsterOne(pointList:Array<any>,lastY:number,stageW:number){
        let listLength = pointList.length;
        let preY = lastY;
        let item = null;
        let random = Math.random();
        let isLeft = random>0.5?false:true;
        let leftDistance=0;
        let rightDistance=0;
        if(listLength) {
            for(let i=0;i<listLength;i++) {
                item = pointList[i];
                if(i<4) {
                    item.roleObj.x = this.randomIsLeftRightX(stageW,item.roleObj.width,isLeft);
                    item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                    isLeft = !isLeft;
                    preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                }else if(i>=4) {
                    if(i===4) {
                        item.roleObj.x = this.randomObjX(stageW,item.roleObj.width);
                        item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                        leftDistance = item.roleObj.x;
                        rightDistance = stageW - item.roleObj.x-item.roleObj.width;
                    }else {
                        if(leftDistance>rightDistance) {
                            item.roleObj.x = this.randomObjX(leftDistance,item.roleObj.width);
                            item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                            preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                        }else {
                            item.roleObj.x = this.randomMinX (rightDistance,pointList[4].roleObj.x+pointList[4].roleObj.width,item.roleObj.width);
                            item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                            preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                        }
                    }
                }
                // if(i>3) {
                //     item.roleObj.x = this.randomIsLeftRightX(stageW,pointList[4].roleObj.x +pointList[4].roleObj.width,item.roleObj.width,isLeft);
                // }else {
                //     item.roleObj.x = this.randomIsLeftRightX(stageW,stageW/2,item.roleObj.width,isLeft);
                // }
             
                // item.roleObj.y = preY - item.roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                // if(i!=4) {
                //     preY = item.roleObj.y-this.checkIsHasChildHeight(item.roleObj);
                // }
                // if(i<=4||item.roleObj.y<pointList[4].roleObj.y) {
                //     isLeft = !isLeft;
                // }
         
            }
        }
        return pointList;
    }
 


}