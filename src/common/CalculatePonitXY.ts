class CalculatePonitXY {  // 设计好关卡的点

    public objectPool:ObjectPool;
    constructor (){
        this.objectPool = new ObjectPool();
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

        if(item.$children[1]) {
            height = item.$children[1].height;
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
                item = this.objectPool.createSkinObj(recycleNameList[j]);
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
        item = this.objectPool.createSkinObj(recycleName,monsterType);
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
             item = this.objectPool.createSkinObj(recycleNameList[0]);
             propItem = this.objectPool.createSkinObj(recycleNameList[1],item);
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
    // public recycleObj(obj,typeName){
    //     this.allPropsPool[typeName].push(obj);
    // }

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
        let roleObj = null;
        let random = Math.random();
        let isLeft = random>0.5?false:true;
        let leftDistance=0;
        let rightDistance=0;
        if(listLength) {
            for(let i=0;i<listLength;i++) {
                item = pointList[i];
                roleObj = item.roleObj;
                if(i<4) {
                    roleObj.x = this.randomIsLeftRightX(stageW,roleObj.width,isLeft);
                    roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                    isLeft = !isLeft;
                    preY = roleObj.y-this.checkIsHasChildHeight(roleObj);
                }else if(i>=4) {
                    if(i===4) {
                        roleObj.x = this.randomObjX(stageW,roleObj.width);
                        roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                        leftDistance = roleObj.x;
                        rightDistance = stageW - roleObj.x-roleObj.width;
                    }else {
                        if(leftDistance>rightDistance) {
                            roleObj.x = this.randomObjX(leftDistance,roleObj.width);
                            roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                            preY = roleObj.y-this.checkIsHasChildHeight(roleObj);
                        }else {
                            roleObj.x = this.randomMinX (rightDistance,pointList[4].roleObj.x+pointList[4].roleObj.width,roleObj.width);
                            roleObj.y = preY - roleObj.height - this.setRandomDistance(item.maxDistance,item.minDistance);
                            preY = roleObj.y-this.checkIsHasChildHeight(roleObj);
                        }
                    }
                } 
            }
        }
        return pointList;
    }

    /**
     * 设置mu
     */


    /**
     * 测试增加关卡
     */
 
    //  public addNewCheckPoint(){
    //      let pointJson = RES.getRes('oneSticket_json');
    //      let maxW = pointJson.width;
    //      let maxH = pointJson.height;
    //      let maxHeight = pointJson.height_maxDistance;
    //      let minHeight = pointJson.height_minDistance;
    //      let widthDistance = pointJson.width_distance;
    //      let list = [];
    //      let startX = 0;
    //      let startY = 600;
    //      let sticket=null;
    //      let childrenProp = null;
    //      let sticketList = null;
    //      let sticketHeight = null;
    //      let sticketWidth = null;

    //      for(let i=0;i<maxW;i++) {
    //          for(let j=0;j<maxH;j++) {
    //              if(pointJson.content[i][j] !=="N") {
    //                  sticketList = pointJson.content[i][j].split(',');
    //                  if(sticketList.length>1) {
    //                     sticket = this.objectPool.createSkinObj(sticketList[0]);
    //                     childrenProp = this.objectPool.createSkinObj(sticketList[1],sticket);
    //                     sticket.addChild(childrenProp);
    //                  }else {
    //                     sticket = this.objectPool.createSkinObj(sticketList[0]);
    //                  }
    //                  startY=startY-sticket.height;
    //                  sticket.$x = startX;
    //                  sticket.$y = startY;
    //                  sticketHeight = sticket.height;
    //                  sticketWidth = sticket.width;
    //                 //  console.log();
    //                  console.log('xheY',startY,sticketHeight);
    //                  list.push({
    //                      roleObj:sticket
    //                  });
    //              }else {
    //                  sticketHeight = 60;
    //                  sticketWidth = 60;
    //              }
    //              startY = startY-minHeight;
                
    //          }
    //             startY = 600;
    //             startX = startX+sticketWidth+widthDistance;

    //      }

    //      return list;

    //  }


}