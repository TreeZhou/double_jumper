
// class SetCheckPoints { // extends BasePage
//     private minDistance:number=30;
//     // public stickRecyclePool:any=[];
//     private stickHeightWidth:Object={
//         'fixation':{
//             height:32,
//             width:126
//         },
//         'hitDisable':{
//             height:32,
//             width:126
//         },
//         'horizontal':{
//             height:33,
//             width:136
//         },
//         'oneceHit':{
//             height:32,
//             width:126
//         },
//         'timing':{
//             height:32,
//             width:126
//         },
//         'trampoline':{
//             height:18,
//             width:49
//         },
//         'wing':{
//             height:65,
//             width:54
//         },
//         'rocket':{
//             height:62,
//             width:56
//         },
//         'springShoes':{
//             width:60,
//             height:32
//         },
//         'smallMonster':{
//             width:237,
//             height:161
//         },
//         'bigMonster':{
//             width:286,
//             height:321
//         },
//     };

// 	public skinPropData:Object = {
//             'trampoline': Trampoline,
//             'wing': WingProp,
//             'rocket':RocketProp,
//             'sticket':StickItem,
//             'springShoes':SpringShoesProp,
//             'bigMonster':MonsterProp,
//             'smallMonster':MonsterProp
// 	}
//     public allPropsPool:Object = {
// 			'trampoline': [],
// 			'wing': [],
// 			'rocket':[],
//             'stickRecyclePool':[],
//             'springShoes':[]
// 	}

//     // 关卡函数
//     public fixtionStick(obj:{
//         lastY:number,
//         stageWidth:number,
//         distance:number,
//         num:number,
//         keyName:string
//     }){
//         let list = [];
//         let perY = obj.lastY;
//         let keyName = obj.keyName;
//         let objHeight = this.stickHeightWidth[keyName].height;
//         let objWidth= this.stickHeightWidth[keyName].width;

//         for(let i=0;i<obj.num;i++) {
//             let item =this.createOneStick({
//                 distance:obj.distance,
//                 perY:perY,
//                 objHeight:objHeight,
//                 stageWidth:obj.stageWidth,
//                 objWidth:objWidth,
//                 keyName:keyName
//             });
//             perY = item.$y ;
//             list.push(item);
//         }
//         return list;
//     }
//     public listSticket(obj:{
//         lastY:number,
//         stageWidth:number,
//         distance:number,
//         keyNameList:Array<string>
//     }){
//         let list = [];
//         let perY = obj.lastY;
//         let keyNameLength= obj.keyNameList.length;

//         for(let i=0;i<keyNameLength;i++) {
//             let keyName =  obj.keyNameList[i];
//             let objHeight = this.stickHeightWidth[keyName].height;
//             let objWidth= this.stickHeightWidth[keyName].width;
//             let item =this.createOneStick({
//                 distance:obj.distance,
//                 perY:perY,
//                 objHeight:objHeight,
//                 stageWidth:obj.stageWidth,
//                 objWidth:objWidth,
//                 keyName:keyName
//             });
//             perY = item.$y ;
//             list.push(item);
//         }
//         return list;
//     }

//     public setPropsAndStick(obj:{
//         lastY:number,
//         stageWidth:number,
//         propsName:string,
//         sticketName:string,
//         distance:number
//     }){
//         let list = [];
//         let objHeight = this.stickHeightWidth[obj.sticketName].height;
//         let objWidth= this.stickHeightWidth[obj.sticketName].width;
//         let item =this.createOneStick({
//             distance:obj.distance,
//             perY:obj.lastY,
//             objHeight:objHeight,
//             stageWidth:obj.stageWidth,
//             objWidth:objWidth,
//             keyName:obj.sticketName
//         });
//         let propItem = this.addPropToStage(item,obj.propsName,obj.sticketName);
//         list.push(item);
//         list.push(propItem);
//         return list;
//     }

//     /**
//      * 怪兽的关卡
//      */

//     // public setMonster
  

//     /**
//      * 可以共用的方法
//      */
//     private addPropToStage(referStick:StickItem,propsName:string,sticketName:string) {
//         let item = this.createSkinObj(this.skinPropData[propsName],propsName);
// 		item.$x = this.setPropsX(this.stickHeightWidth[propsName].width,referStick,this.stickHeightWidth[sticketName].width,);
//         item.$y = referStick.$y-this.stickHeightWidth[propsName].height;
//         // debugger;
//         // alert(item.$x+'-'+item.$y+'--'+referStick.$x+'--'+referStick.$y);
// 		return item;
// 	}
//     private setPropsX(propsItemW:number,referStick:StickItem,sticketW:number) {
// 		let randomNum = Math.random();
// 		let itemX =0;
// 		if(randomNum>0.5) {
// 			itemX = referStick.$x+10;
// 		}else {
// 			itemX = referStick.$x+sticketW-propsItemW-10;
// 		}

// 		return itemX;
// 	}
//     private createSkinObj(objClass,recycleList:any){
// 		let item = null;
//         let propsList = this.allPropsPool[recycleList];
// 		if(propsList.length) {
// 			item = this.allPropsPool[recycleList][0];
// 			this.allPropsPool[recycleList].shift();

// 		}else {
// 			item = new objClass();
// 		}

// 		return item;
// 	}
//     public recycleObj(obj:Object,recycleName:string){
// 		this.allPropsPool[recycleName].push(obj);
// 	}
//     public randomObjX(stageWidth:number,objWidth:number){
//         let randomX = 0;
//         randomX = Math.random() * (stageWidth-objWidth);
//         return randomX;
//     }
//     public createOneStick(obj:{
//         distance:number,
//         perY:number,
//         objHeight:number,
//         stageWidth:number,
//         objWidth:number,
//         keyName:string
//     }){

//         let item = this.createSkinObj(this.skinPropData['sticket'],'stickRecyclePool');
//         let ranDistance = Math.ceil(Math.abs(Math.random() * (obj.distance - this.minDistance)) + this.minDistance);
//         item.$y = obj.perY-obj.objHeight-ranDistance;
//         item.$x = this.randomObjX(obj.stageWidth,obj.objWidth);
//         item.typeName = obj.keyName;
//         // item.setStickTypeName(item.typeName);
        
//         return item;
//     }
// }
